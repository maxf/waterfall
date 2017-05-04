(function() {
  const fs = require('fs');
  const exif = require('exif-parser');
  const electron = require('electron').remote

  function doDeleteFile(filepath) {
    console.log('deleting', filepath);

    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch(e) {
        console.log('failed to delete', filepath, e);
        return "";
      }

      console.log('delete succeeded:', filepath);
      return filepath;
    } else {
      console.log('failed to find', filepath);
      return "";
    }
  }

  function deleteFile(filePath) {
    const reallyDelete =
          window.confirm('Are you sure you want to delete this picture?');
    return reallyDelete ? doDeleteFile(filePath) : "";
  }


  // read all the photos, extract exif information, return a csv as:
  // name, create_date
  // "/home/mf/Pictures/MEGA/R0010245_20170401085226.JPG","2017:04:01 08:52:21"
  // "/home/mf/Pictures/MEGA/2017-02-22 14.12.10.jpg","2017:02:22 14:12:00"

  function readCreateDate(path) {
    const file = fs.readFileSync(path);
    const parser = exif.create(file);
    const exifData = exif.create(file).parse();
    return exifData.tags.CreateDate;
  }

  const flatten = (arr) =>
    arr.reduce(
      (flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
      []);


  // return list of files in dir and all its subdirectories
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

  const getPhotos = photosDir =>
    photos = readdirRecursive(photosDir)
      .map(path => path + '__' + readCreateDate(path));

  const requestPhotoDir = () =>
    // https://github.com/electron/electron/blob/master/docs/api/dialog.md
    electron.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
        title: 'Please choose a directory with pictures'
      }
    ) || []


  module.exports = {
    deleteFile : deleteFile,
    getPhotos: getPhotos,
    requestPhotoDir : requestPhotoDir
  };

}());
