'use strict'

const express = require('express')
const app = express()
const fs = require('fs')
const recursive = require("recursive-readdir")
const path = require('path')

require('dotenv').config()
const photosDir = process.env.PHOTOS_DIR
const thumbsDir = process.env.THUMBS_DIR
if (!photosDir || !thumbsDir) {
  console.log("you must set the PHOTOS_DIR and THUMBS_DIR env variables")
  process.exit()
}


const isDotFile = file => file.charAt(0) === '.'

const isPhoto = file =>
  ['.jpg', '.JPG', '.jpeg', '.JPEG'].indexOf(path.extname(file)) !== -1

const excludeFiles = function(file, stats) {
  return isDotFile(file) || (stats.isFile() && !isPhoto(file))
}

const getDirContents = function(baseDir, dirToScan, res, next) {
  recursive(`${baseDir}/${dirToScan}`, [excludeFiles], function (err, files) {
    res.send(files.map(path => path.slice(1+baseDir.length)))
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

app.use(express.static('public'))
app.get('/api/dirs', dirs)
app.get('/api/scan', scan)
app.listen(3000, () => console.log('Example app listening on port 3000!'))
