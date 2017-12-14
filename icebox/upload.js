var messageEl = document.getElementById('message');
var counterEl = document.getElementById('counter');
var inpImgEl = document.getElementById('inp_img');
var inpFiles = document.getElementById('inp_files');
var saveBtn = document.getElementById('bt_save');
var exifDateEl = document.getElementById('exif_date');
var fileUploadEl = document.getElementById('inp_files');

var max_size = 800;

// from file names like: 2017:07:28 20:21:49
// to ISO8601 strings : 2017-07-28T20:21:49
function exifDateToIso(s) {
  return s.slice(0, 4) + '-' + s.slice(5, 7) + '-' + s.slice(8, 10) +
    'T' + s.slice(11, 13) + ':' + s.slice(14, 16) + ':' + s.slice(17, 19) + 'Z';
}

function fileChange(e) {
  var numImages = e.target.files.length;
  var counter = numImages;

  inpImgEl.value = '';
  saveBtn.setAttribute('disabled', 'true');
  messageEl.innerHTML = 'Resizing images (' + numImages  + ' to go)';
  inpFiles.style.display = 'none';

  for (var i = 0; i < numImages; i++) {

    var file = e.target.files[i];

    if (file.type == "image/jpeg" || file.type == "image/png") {

      var reader = new FileReader();
      reader.onload = function(readerEvent) {

        var image = new Image();
        image.onload = function(imageEvent) {

          var w = image.width;
          var h = image.height;

          if (w > h) {
            if (w > max_size) { h*=max_size/w; w=max_size; }
          } else {
            if (h > max_size) { w*=max_size/h; h=max_size; }
          }

          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(image, 0, 0, w, h);
          if (file.type == "image/jpeg") {
            var dataURL = canvas.toDataURL("image/jpeg", 1.0);
          } else {
            var dataURL = canvas.toDataURL("image/png");
          }
          inpImgEl.value += dataURL + '|';
          EXIF.getData(image, function() {
            var dateCreated = EXIF.getTag(this, "DateTimeOriginal");
            if (!dateCreated) {
              var today = new Date();
              var Y = today.getFullYear();
              var M = today.getMonth();
              var D = today.getDay();
              var h = today.getHours();
              var m = today.getMinutes();
              var s = today.getSeconds();
              dateCreated =
                Y + ":" + (M < 10 ? 0 : "") + M + ":" + (D < 10 ? 0 : "") + D +
                " " + (h < 10 ? 0 : "") + h +
                ":" + (m < 10 ? 0 : "") + m +
                ":" + (s < 10 ? 0 : "") + s;
                console.log(dateCreated);
            }
            exifDateEl.value += exifDateToIso(dateCreated) + '|';
            if (counter === 1) {
              messageEl.innerHTML = 'OK';
              saveBtn.removeAttribute('disabled');
              saveBtn.style.display = 'inline';
            } else {
              counter--;
              messageEl.innerHTML = 'Resizing images (' + counter + ' to go)'
            }
          });
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    } else {
      fileUploadEl.value = '';
      alert('Please only select images in JPG- or PNG-format.');
      return false;
    }
  }
}

document.getElementById('inp_files').addEventListener('change', fileChange, false);
