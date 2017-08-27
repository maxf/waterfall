const Elm = require('./elm.js');
const files = require('./files.js');
const node = document.getElementById('main');
const app = Elm.Main.embed(node);

app.ports.deletePhoto.subscribe(args => {
  const baseDir = args[0];
  const filePath = args[1];
  const success = files.deleteFile(baseDir, filePath)
  const deletedFilePath = success ? filePath : '';
  app.ports.deletePhotoResult.send(deletedFilePath);
});
app.ports.scanPhotos.subscribe(dir => {
  files.scanPhotos(dir, metadataList => {
    app.ports.scanPhotosResult.send(metadataList);
  })
});
app.ports.requestPhotoDir.subscribe(() => {
  const dir = files.requestPhotoDir();
  app.ports.requestPhotoDirResult.send(dir);
});
app.ports.saveModel.subscribe(model => {
  files.saveModel(model, err => {
    app.ports.saveModelResult.send(!err);
  })
});
app.ports.loadModel.subscribe(() => {
  files.loadModel((err, data) => {
    app.ports.loadModelResult.send(err ? "" : data.toString());
  })
});



let closeWindow = false

window.addEventListener('beforeunload', evt => {
  if (closeWindow) return;
  evt.returnValue = false;
  // save the model (even if user doesn't quit
  app.ports.applicationQuitting.send("save model now");
  setTimeout(() => {
    let result = dialog.showMessageBox({
      message: 'Quit app?',
      buttons: ['Yes', 'No']
    });
    if (result == 0) {
      closeWindow = true
      remote.getCurrentWindow().close();
    }
  })
})
