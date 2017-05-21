(function() {
  const fs = require('fs');
  const exif = require('exif-parser');
  const electron = require('electron').remote
  const path = require('path');

  function doDeleteFile(filePath, fileName) {
    const fullName = filePath + "/" + fileName;

    if (fs.existsSync(fullName)) {
      try {
        fs.unlinkSync(fullName);
      } catch(e) {
        console.log('failed to delete', fullName, e);
        return false;
      }
      console.log('delete succeeded:', fullName);
      return true;
    } else {
      console.log('failed to find', fullName);
      return false;
    }
  }

  function deleteFile(filePath, fileName) {
    const reallyDelete =
      window.confirm('Are you sure you want to delete this picture?');
    return reallyDelete ? doDeleteFile(filePath, fileName) : "";
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

  const scanPhotos = (photosDir, cb) => {
    readDirAsync(
      photosDir,
      photos => cb(
          photos
            .map(path => {
              const createDate = readCreateDate(path);
              return createDate
                ?
                  {
                    fileName: path.replace(photosDir + '/', ''),
                    dateCreated: createDate
                  }
                : {filename:"", dateCreated:""};
            })
            .filter(path => path.fileName && path.dateCreated)
      )
    )
  }

  const requestPhotoDir = () =>
    // https://github.com/electron/electron/blob/master/docs/api/dialog.md
    electron.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
        title: 'Please choose a directory with pictures'
      }
    ) || []


  // Metadata file save/load

  const modelFile =
    path.join(electron.app.getPath('userData'), 'model.json');

  const saveModel = (model, cb) =>
    fs.writeFile(modelFile, model, cb);

  const loadModel = cb =>
    fs.readFile(modelFile, cb);



  module.exports = {
    deleteFile : deleteFile,
    scanPhotos: scanPhotos,
    requestPhotoDir : requestPhotoDir,
    saveModel : saveModel,
    loadModel : loadModel,
  };

}());
