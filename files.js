(function() {
  fs = require('fs');

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

  module.exports = { deleteFile : deleteFile };

}());
