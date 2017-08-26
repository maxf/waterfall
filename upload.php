<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
</head><body>

<?php

if (count($_POST)) {

  $img = explode('|', $_POST['img']);

  for ($i = 0; $i < count($img) - 1; $i++) {

     if (strpos($img[$i], 'data:image/jpeg;base64,') === 0) {
        $img[$i] = str_replace('data:image/jpeg;base64,', '', $img[$i]);
        $ext = '.jpg';
     }
     if (strpos($img[$i], 'data:image/png;base64,') === 0) {
        $img[$i] = str_replace('data:image/png;base64,', '', $img[$i]);
        $ext = '.png';
     }

     $img[$i] = str_replace(' ', '+', $img[$i]);
     $data = base64_decode($img[$i]);
     $file = 'uploads/img'.date("YmdHis").'_'.$i.$ext;

     if (file_put_contents($file, $data)) {
        echo "<p>Image $i was saved as $file.</p>";
     } else {
        echo '<p>Image $i could not be saved.</p>';
     }

  }

}

?>


<input id="inp_files" type="file" multiple="multiple">

<form method="post" action="">
  <input id="inp_img" name="img" type="hidden" value="">
  <input id="bt_save" type="submit" value="Upload">
</form>


<script>

  function fileChange(e) {
     document.getElementById('inp_img').value = '';

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

                 if (w > h) {  if (w > max_size) { h*=max_size/w; w=max_size; }
                 } else     {  if (h > max_size) { w*=max_size/h; h=max_size; } }

                 var canvas = document.createElement('canvas');
                 canvas.width = w;
                 canvas.height = h;
                 canvas.getContext('2d').drawImage(image, 0, 0, w, h);
                 if (file.type == "image/jpeg") {
                    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
                 } else {
                    var dataURL = canvas.toDataURL("image/png");
                 }
                 document.getElementById('inp_img').value += dataURL + '|';
              }
              image.src = readerEvent.target.result;
           }
           reader.readAsDataURL(file);
        } else {
           document.getElementById('inp_files').value = '';
           alert('Please only select images in JPG- or PNG-format.');
           return false;
        }
     }

  }

  document.getElementById('inp_files').addEventListener('change', fileChange, false);

</script>

</body></html>
