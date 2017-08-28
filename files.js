(function() {
  const fs = require('fs');
  const exif = require('exif-parser');
  const path = require('path');


  // returns the filePath or '' if error
  function doDeleteFile(baseDir, filePath) {
    const fullName = baseDir + "/" + filePath;
    var result = '';

    if (fs.existsSync(fullName)) {
      try {
        fs.unlinkSync(fullName);
      } catch(e) {
        console.log('failed to delete', fullName, e);
        result = '';
      }
      console.log('delete succeeded:', fullName);
      result = filePath;
    } else {
      console.log('failed to find', fullName);
      result = '';
    }
    return result;
  }


  function deleteRelatedFiles(baseDir, filePath) {
    const filePathNoExt =
      filePath.replace(/(.*)\.[^.]+/, '$1');
    const fileDir =
      (baseDir + '/' + filePath).replace(/(.*)\/[^/]+/, '$1');

    const relatedFilesNames =
      fs
        .readdirSync(fileDir)
        .filter(fileName =>
          (fileDir + '/' + fileName).indexOf(filePathNoExt) !== -1
        );

    if (relatedFilesNames.length) {
      const confirm =
        window.confirm('Would you also like to delete:\n' + relatedFilesNames.join('\n') + '?');
      if (confirm) {
        relatedFilesNames.map(fileName => doDeleteFile(fileDir, fileName))
      }
    }
  }


  // returns the name of the file
  function deleteFile(baseDir, filePath) {
    var deletedFilePath = '';
    const reallyDelete =
      window.confirm('Are you sure you want to delete this picture?');

    if (reallyDelete) {
      deletedFilePath = doDeleteFile(baseDir, filePath);
      deleteRelatedFiles(baseDir, filePath);
    } else {
      deletedFilePath = '';
    }
    return deletedFilePath;
  }


  function readCreateDate(path) {
    const file = fs.readFileSync(path);
    const parser = exif.create(file);
    var result;
    try {
      const exifData = exif.create(file).parse();
      result = exifData.tags.CreateDate;
    } catch (e) {
      console.log("failed to parse Exif data in ", path);
      result = null;
    }
    return parseInt(result, 10);
  }

  const flatten = (arr) =>
    arr.reduce(
      (flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
      []);


  // return list of files in dir and all its subdirectories
  const readDirAsync = (dir, cb) => {
    process.nextTick(() => cb(readdirRecursive(dir)));
  }

  const readdirRecursive = dir => {
    const dirContents = fs
      .readdirSync(dir)
      .filter(name => !/^\./.test(name))
      .map(name => {
        const path = dir + '/' + name;
        const stat = fs.statSync(path);
        return stat.isDirectory() ? readdirRecursive(path) : (stat.isFile() ? path : '');
      });
    return flatten(dirContents)
      .filter(name => /\.(jpg|JPG|jpeg|JPEG)$/.test(name));
  }


  // array of { absoluteFilePath: "", created: "" }
  // persisted from the previous file scan
  var currentList = []; // TODO: must be reset on directory change

  const extractExifInfo = (photosDir, absoluteFilePath) => {
    const createDate = readCreateDate(absoluteFilePath);
    const res = createDate
      ?
        {
          relativeFilePath: absoluteFilePath.replace(photosDir + '/', ''),
          dateCreated: createDate
        }
      : {relativeFilePath:"", dateCreated:""};
    return res;
  }

  const addExifInfo2 = photosDir => absoluteFilePath => {
    const relPath = absoluteFilePath.replace(photosDir + '/', '');
    const existing = currentList.find(el => {
      return el.relativeFilePath === relPath
    });

    if (existing) {
      return existing;
    } else {
      return extractExifInfo(photosDir, absoluteFilePath);
    }
  }


  // Metadata file save/load
/*
  let modelObj = {}; // keep the metadata here so we can save it quickly on exit

  const modelFile = 'model.json';

  const saveModel = (model, cb) =>
    fs.writeFile(modelFile, modelObj = model, cb);

  const loadModel = cb => {
    fs.readFile(modelFile, (err, data) => {
        err || (modelObj = data); cb(err, data)
    });
  }
*/
  module.exports = {
    deleteFile : deleteFile//,
//    scanPhotos: scanPhotos,
//    saveModel : saveModel,
//    loadModel : loadModel,
  };

}());
