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
const request = require('request')
require('dotenv').config()

const isDotFile = file =>
  file.indexOf('/.') !== -1

const isPhoto = file =>
  ['.jpg', '.jpeg'].indexOf(path.extname(file).toLowerCase()) !== -1

const excludeFiles = function(file, stats) {
  return isDotFile(file) || (stats.isFile() && !isPhoto(file))
}

const readFilePromise = function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => err ? reject(err) : resolve(data))
  })
}


const getExifOriginalDate = async function(path) {
  try {
    const fileData = await readFilePromise(path)
    const exifData = exif.create(fileData).parse()
    return parseInt(exifData.tags.CreateDate, 10)
 } catch (err) {
    console.log("failed to parse Exif data in ", path)
    return null
  }
}


const makePhotoObject = async function(fileName) {
  let date = await getExifOriginalDate(fileName)
  return {
    date: date,
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

const scan = async function(req, res) {
  const album = decodeURIComponent(req.query.dir)
  const dirToScan = path.join(photosDir, album)
  recursive(dirToScan, [excludeFiles], async function (err, files) {
    const photoList = files.map(makePhotoObject)

    try {
      const list = await Promise.all(photoList)
      return res.send(JSON.stringify(list))
    } catch (e) {
      res.status(500).send('failed to scan photos: ' + e)
    }
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

const rotate = async (req, res) => {
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

const uploadMediaAttachment = function(apiUrl, path, token) {
  // https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#uploading-a-media-attachment
  const options = {
    url: apiUrl + '/api/v1/media',
    headers: {
      'Authorization': token
    },
    formData: {
      file: fs.createReadStream(path.join(photosDir, path))
    }
  }
  return new Promise((resolve, reject) =>
    request.post(options, (err, httpResponse, body) => {
      if (err || httpResponse !== 200) {
        reject('upload failed:', err || httpResponse)
      } else {
        resolve(JSON.parse(body))
      }
    })
  )
}

const postStatus = function(apiUrl, text, token, attachment) {
  // https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#posting-a-new-status
  const options = {
    url: apiUrl + '/api/v1/media',
    headers: {
      'Authorization': token
    },
    form: {
      status: text,
      media_ids: [attachment.id]
    }
  }
  return new Promise((resolve, reject) => {
    request.post(options, (err, httpResponse, body) => {
      if (err || httpResponse !== 200) {
        reject('status posting failed:', err || httpResponse)
      } else {
        resolve('Upload successful!  Server responded with:', body)
      }
    })
  })
}

const share = async function(req, res) {
  const apiUrl = req.query.apiurl
  const text = req.query.text
  const token = req.query.token
  const path = req.query.path

  uploadMediaAttachment(apiUrl, path, token)
    .then(attachment => postStatus(apiUrl, text, token, JSON.parse(attachment)))
}

app.use(express.static('public', { extensions: ['html'] }))
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
