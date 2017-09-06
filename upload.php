<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <script src="exif.js"></script>
  </head>
  <body>

    <a href=".">View photos</a>

    <?php

      if (count($_POST)) {
        $img = explode('|', $_POST['img']);
        $dates = explode('|', $_POST['date']);
        $dir = $_POST['dir'];

        for ($i = 0; $i < count($img) - 1; $i++) {
          $img[$i] = str_replace('data:image/jpeg;base64,', '', $img[$i]);
          $img[$i] = str_replace(' ', '+', $img[$i]);

          $data = base64_decode($img[$i]);
          $date = str_replace(' ', '_', $dates[$i]);
          $file = "uploads/${dir}/img_${date}_${i}.jpg";

          if (file_put_contents($file, $data)) {
            echo "<p>Image $i was saved as $file.</p>";
          } else {
            echo "<p>Image $i could not be saved as <code>$file</code>.</p>";
          }
        }

        echo '<h1>Upload more photos</h1>';
      } else {
        echo '<h1>Upload photos</h1>';
      }

    ?>


    <input id="inp_files" type="file" multiple="multiple">

    <form method="post" action="">
      <select name="dir">
        <option>Unknown</option>
        <option>Max</option>
        <option>Steph</option>
        <option>Claire</option>
        <option>Antoine</option>
      </select>
      <input id="inp_img" name="img" type="hidden" style="width:100%">
      <input id="exif_date" name="date" type="hidden" value="" style="width:100%">
      <div id="message">Please choose the images you want to send</div>
      <input id="bt_save" type="submit" value="Upload" disabled style="display:none">
    </form>


    <script src="upload.js"></script>

  </body></html>
