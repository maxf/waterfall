'use strict';

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

const scan = function(req, res, next) {
  const dirToScan = req.query.dir
  console.log(req.query);
  getDirContents(photosDir, dirToScan, res, next)
}


const filterFiles = function(file, stats) {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.
  return stats.isDirectory() ||
    ['.jpg', '.JPG', '.jpeg', 'JPEG'].indexOf(path.extname(file)) === -1
}

const getDirContents = function(baseDir, dirToScan, res, next) {
//  const files = fs.readdirSync(`${baseDir}/${dirToScan}`)
  console.log('scanning', `${baseDir}/${dirToScan}`)
  recursive(`${baseDir}/${dirToScan}`, [filterFiles], function (err, files) {
    console.log(files)
    res.send(files)
    next()
 });
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

app.use(express.static('public'));
app.get('/api/dirs', dirs)
app.get('/api/scan', scan)
app.listen(3000, () => console.log('Example app listening on port 3000!'))
