var messageEl = document.getElementById('message');
var counterEl = document.getElementById('counter');
var inpImgEl = document.getElementById('inp_img');
var saveBtn = document.getElementById('bt_save');
var exifDateEl = document.getElementById('exif_date');
var fileUploadEl = document.getElementById('inp_files');

// from file names like: 2017:07:28 20:21:49
// to ISO8601 strings : 2017-07-28T20:21:49
function exifDateToIso(s) {
  return s.slice(0, 4) + '-' + s.slice(5, 7) + '-' + s.slice(8, 10) +
    'T' + s.slice(11, 13) + ':' + s.slice(14, 16) + ':' + s.slice(17, 19) + 'Z';
}

function fileChange(e) {
  inpImgEl.value = '';
  saveBtn.setAttribute('disabled', 'true')
  messageEl.innerHTML = 'Resizing images';
  counterEl.value = e.target.files.length;

  for (var i = 0; i < e.target.files.length; i++) {

    var file = e.target.files[i];

    if (file.type == "image/jpeg" || file.type == "image/png") {

      var reader = new FileReader();
      reader.onload = function(readerEvent) {

        var image = new Image();
        image.onload = function(imageEvent) {

          var max_size = 300;
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
            exifDateEl.value += exifDateToIso(dateCreated) + '|';
            counterEl.value = counterEl.value - 1;
            if (counterEl.value == 0) {
              messageEl.innerHTML = 'Ready to upload';
              saveBtn.removeAttribute('disabled');
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
