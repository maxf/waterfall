'use strict';

const restify = require('restify')
const fs = require('fs')
const recursive = require("recursive-readdir")
const path = require('path')

const photosDir = process.env.PHOTOS_DIR
const thumbsDir = process.env.THUMBS_DIR

if (!photosDir || !thumbsDir) {
  console.log("you must set the PHOTOS_DIR and THUMBS_DIR env variables")
  process.exit()
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
  const dirToScan = req.params.dir
  getDirContents(photosDir, dirToScan, res, next)
}


const filterFiles = function(file, stats) {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.
  return path.basename(file) = ".JPGtest";
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



var server = restify.createServer()
server.get('/dirs/', dirs)
server.get('/scan/:dir', scan)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
