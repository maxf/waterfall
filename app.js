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
const jpegtran = require('jpegtran-bin')
const mkdirp = require('mkdirp')
require('dotenv').config()


const isDotFile = file =>
  file.indexOf('/.') !== -1

const isPhoto = file =>
  ['.jpg', '.jpeg'].indexOf(path.extname(file).toLowerCase()) !== -1

const excludeFiles = function(file, stats) {
  return isDotFile(file) || (stats.isFile() && !isPhoto(file))
}

const exifOriginalDate = path => {
  const file = fs.readFileSync(path)
  let result
  try {
    const exifData = exif.create(file).parse()
    result = exifData.tags.CreateDate
  } catch (e) {
    console.log("failed to parse Exif data in ", path)
    result = null
  }
  return parseInt(result, 10)
}

const makePhotoObject = baseDir => fileName => {
  return {
    date: exifOriginalDate(fileName),
    path: path.relative(baseDir, fileName)
  }
}

const dirs = function(req, res) {
  const dirToScan = path.join(photosDir, decodeURIComponent(req.query.base || ""))
  execFile('find', [ dirToScan, '-type', 'd' ], function(err, stdout, stderr) {
    const dirs = stdout
      .split('\n')
      .filter(s => s !== "")
      .map(s => path.relative(photosDir, s))
      .sort()
    res.send(JSON.stringify(dirs))
  })
}

const scan = function(req, res) {
  const dirToScan = path.join(photosDir, decodeURIComponent(req.query.dir))
  recursive(dirToScan, [excludeFiles], function (err, files) {
    res.send(files.map(makePhotoObject(dirToScan)).filter(obj=>obj.date))
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
          .catch(err => { res.send('resize error with:' + photoFullPath(imagePath) + ' -- ' + err) })
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

const rotate = async (req, res) => {
  const angle = parseInt(req.query.angle, 10)
  const unmarkedPath = decodeURIComponent(req.query.photo).replace(/_\d+$/, '')
  const fullImagePath = photoFullPath(unmarkedPath)
  const jpegtranArgs = ['-rotate', angle, '-outfile', fullImagePath, fullImagePath]
  execFile(jpegtran, jpegtranArgs, function (err) {
    if (err) {
      console.log('rotate error', err)
      res.status(400).send(JSON.stringify({ error: err }))
    } else {
      deleteThumbs(unmarkedPath)
      res.send(JSON.stringify({
        old: decodeURIComponent(req.query.photo),
        new: `${unmarkedPath}_${Date.now()}`
      }))
    }
  });
}

app.use(express.static('public'))
app.get('/api/dirs', dirs)
app.get('/api/scan', scan)
app.get('/api/delete', deletePhoto)
app.get('/api/rotate', rotate)
app.get('/thumb', sendPhoto(thumbSize))
app.get('/preview', sendPhoto(previewSize))

sharp.cache(false)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
