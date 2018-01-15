'use strict'

const photosDir = process.env.PHOTOS_DIR
const thumbsDir = process.env.THUMBS_DIR

if (!photosDir || !thumbsDir) {
  console.log("you must set the PHOTOS_DIR and THUMBS_DIR env variables")
  process.exit()
} else {
  console.log("PHOTOS_DIR:", photosDir)
  console.log("THUMBS_DIR:", thumbsDir)
}


const thumbSize = 300 // pixels
const previewSize = 1000 // pixels

const express = require('express')
const app = express()
const fs = require('fs')
const recursive = require("recursive-readdir")
const path = require('path')
const exif = require('exif-parser')
const sharp = require('sharp')
const execFile = require('child_process').execFile
const mkdirp = require('mkdirp')
const bodyParser = require('body-parser')
const Mastodon = require('mastodon')
require('dotenv').config()

const isDotFile = file =>
  file.indexOf('/.') !== -1

const isPhoto = file =>
  ['.jpg', '.jpeg'].indexOf(path.extname(file).toLowerCase()) !== -1

const excludeFiles = function(file, stats) {
  return isDotFile(file) || (stats.isFile() && !isPhoto(file))
}

const exifOriginalDate = function(path) {
  const fileData = fs.readFileSync(path)
  try {
    const exifData = exif.create(fileData).parse()
    return parseInt(exifData.tags.CreateDate, 10)
  } catch (err) {
    console.log("failed to parse Exif data in ", path, err)
    return null
  }
}

const makePhotoObject = function(fileName) {
  return {
    date: exifOriginalDate(fileName),
    path: path.relative(photosDir, fileName)
  }
}


const dirs = function(req, res) {
  const dirToScan = path.join(photosDir, decodeURIComponent(req.query.base || ""))
  execFile('find', [ dirToScan, '-type', 'd' ], function(err, stdout, stderr) {
    const dirs = stdout
      .split('\n')
      .filter(s => s !== '')
      .map(s => path.relative(photosDir, s))
      .filter(s=> !(s==='' || /(\/\.)|^\./.test(s)))
      .sort()
    res.send(JSON.stringify(dirs))
  })
}

const scan = function(req, res) {
  const album = decodeURIComponent(req.query.dir)
  const dirToScan = path.join(photosDir, album)
  recursive(dirToScan, [excludeFiles], function (err, files) {
    const photoList = files.map(makePhotoObject)
    res.send(JSON.stringify(photoList))
  })
}

const photoFullPath = imagePath =>
  path.resolve(photosDir, imagePath)

const thumbFullPath = (imagePath, size) =>
  path.join(thumbsDir, path.dirname(imagePath), `${size}-${path.basename(imagePath)}`)

const sendPhoto = size => (req, res) => {
  const imagePath = decodeURIComponent(req.query.photo).replace(/_\d+$/, '')
  const thumbPath = thumbFullPath(imagePath, size)
  const thumbDir = path.dirname(thumbPath)

  if (!fs.existsSync(thumbPath)) {
    mkdirp(thumbDir, function (err) {
      if (err) {
        console.error('dir creation error', err)
      } else {
        sharp(photoFullPath(imagePath))
          .resize(size)
          .toFile(thumbPath)
          .then( () => res.sendFile(thumbPath))
          .catch(err => { res.status(500).send('resize error with:' + photoFullPath(imagePath) + ' -- ' + err) })
      }
   })
  } else {
    res.sendFile(thumbPath)
  }
}

const thumbs = imagePath => {
  const thumbsPath = path.resolve(thumbsDir, path.dirname(imagePath))
  const thumbsRe = new RegExp(`\\d+-${path.basename(imagePath)}$`)
  return fs
    .readdirSync(thumbsPath)
    .filter(fileName => thumbsRe.test(fileName))
    .map(fileName => path.join(thumbsPath, fileName))
}

const deletePhoto = (req, res) => {
  const imagePath = decodeURIComponent(req.query.photo).replace(/_\d+$/, '')
  fs.unlink(photoFullPath(imagePath), () => {
    deleteThumbs(imagePath)
    res.send(`"${imagePath}"`)
  })
}

const deleteThumbs = filePath =>
  thumbs(filePath).map(fs.unlinkSync)

const rotateArg = angle => {
  switch (angle) {
    case '90': return '-9'
    case '-90': return '-2'
    case '270': return '-2'
    default: return null
  }
}

const rotate = function(req, res) {
  const angleArg = rotateArg(req.query.angle, 10)
  if (angleArg) {
    const unmarkedPath = decodeURIComponent(req.query.photo).replace(/_\d+$/, '')
    const fullImagePath = photoFullPath(unmarkedPath)
    const exiftranArgs = [ rotateArg(req.query.angle), '-i', fullImagePath ]
    execFile('exiftran', exiftranArgs, function (err, stdout, stderr) {
      if (err) {
        console.log('exiftran error', err)
        res.status(500).send(JSON.stringify({ error: err }))
      } else {
        deleteThumbs(unmarkedPath)
        res.send(`"${unmarkedPath}_${Date.now()}"`)
      }
    })
  } else {
    console.log('bad angle value received: ', req.query.angle)
    res.status(500).send(JSON.stringify({ error: err }))
  }
}

const share = function(req, res) {
  const apiUrl = req.body.apiurl
  const text = req.body.text
  const token = req.body.token
  const photoPath = req.body.path

  const M = new Mastodon({
    access_token: token,
    api_url: apiUrl + '/api/v1/'
  })

  M.post('media', { file: fs.createReadStream(path.join(photosDir, photoPath)) })
    .then(resp => {
      M.post('statuses', { status: text, media_ids: [resp.data.id] })
        .then(() => res.send("post succeeded"))
        .catch(error => res.send('upload status failed', error))
    })
   .catch(error => res.send('upload media failed', error))
}

app.use(express.static('public', { extensions: ['html'] }))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.redirect('/organise'))
app.get('/api/dirs', dirs)
app.get('/api/scan', scan)
app.get('/api/delete', deletePhoto)
app.get('/api/rotate', rotate)
app.get('/thumb', sendPhoto(thumbSize))
app.get('/preview', sendPhoto(previewSize))
app.post('/share', share)

sharp.cache(false)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
