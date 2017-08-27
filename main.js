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
