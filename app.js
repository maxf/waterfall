'use strict'

const thumbSize = 300 // pixels

const photosDir = process.env.PHOTOS_DIR
const thumbsDir = process.env.THUMBS_DIR

const express = require('express')
const app = express()
const fs = require('fs')
const recursive = require("recursive-readdir")
const path = require('path')
const exif = require('exif-parser')

require('dotenv').config()
if (!photosDir || !thumbsDir) {
  console.log("you must set the PHOTOS_DIR and THUMBS_DIR env variables")
  process.exit()
}


const isDotFile = file =>
  file.charAt(0) === '.'

const isPhoto = file =>
  ['.jpg', '.JPG', '.jpeg', '.JPEG'].indexOf(path.extname(file)) !== -1

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
    path: fileName.slice(1 + baseDir.length)
  }
}


const getDirContents = function(baseDir, dirToScan, res, next) {
  recursive(`${baseDir}/${dirToScan}`, [excludeFiles], function (err, files) {
    res.send(files.map(makePhotoObject(baseDir)).filter(obj=>obj.date))
    next()
 })
}


const dirs = function(req, res, next) {
  const contents = fs.readdirSync(photosDir)
  const dirs = contents.filter(
    item =>
      item[0] !== '.' && fs.lstatSync(`${photosDir}/${item}`).isDirectory()
  )
  res.send(dirs)
  next()
}

const scan = function(req, res, next) {
  const dirToScan = req.query.dir
  getDirContents(photosDir, dirToScan, res, next)
}

const thumb = function(req, res, next) {
  const imagePath = req.query.photo
  const thumbPath =
    `${thumbsDir}/${path.dirname(imagePath)}/${thumbSize}-${path.basename(imagePath)}`

  if (fs.existsSync(thumbPath)) {
    // send existing thumbnail -- todo: check if it's faster to redirect to
    // static thumb
    const readStream = fs.createReadStream(thumbPath)
    readStream.pipe(res)
  } else {
    /* generate thumbnail */
  }
  next()
}

app.use(express.static('public'))
app.get('/api/dirs', dirs)
app.get('/api/scan', scan)
app.get('/thumb', thumb)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
