<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <script src="exif.js"></script>
  </head>
  <body>

    <?php

    if (count($_POST)) {

      $img = explode('|', $_POST['img']);

      $dates = explode('|', $_POST['date']);

      for ($i = 0; $i < count($img) - 1; $i++) {

        $img[$i] = str_replace('data:image/jpeg;base64,', '', $img[$i]);
        $img[$i] = str_replace(' ', '+', $img[$i]);

        $data = base64_decode($img[$i]);
        //      $file = 'uploads/img'.date("YmdHis").'_'.$dates[$i].'_'.$i.'.jpg';

        $date = str_replace(' ', '_', $dates[$i]);
        $file = 'uploads/img_'.$date.'_'.$i.'.jpg';

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
      <input id="exif_date" name="date" type="text" value="" style="width:100%">
      <br>
      <input id="counter" type="number" value="0"><span> images to process</span>
      <div id="message">Please select your images</div>
      <input id="bt_save" type="submit" value="Upload" disabled>
    </form>


    <script src="upload.js"></script>

  </body></html>
