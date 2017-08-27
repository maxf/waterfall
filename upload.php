<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<script src="exif.js"></script>
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
    <input id="inp_img" name="img" type="text" style="width:100%">
    <br>
    <input id="exif_date" type="text" value="" style="width:100%">
    <br>
    <input id="counter" type="number" value="0"><span> images to process</span>
    <div id="message">Please select your images</div>
    <input id="bt_save" type="submit" value="Upload" disabled>
  </form>


  <script src="upload.js"></script>

</body></html>
