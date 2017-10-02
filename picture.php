<?php

# display errors in output
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

$width = $_GET['w'];
//$height = $_GET['h'];
$imagePath = $_GET['path'];

if (!$width || !$imagePath) {
  die("You must specify the 'path' and 'w' query string params");
}

if ( ! file_exists($imagePath)) {
  die('Unable to process the requested file.');
}


$m = array();
$r = preg_match('/(.*)\/([^\/]+)/', $imagePath, $m);
$folder = $m[1];
$fileName = $m[2];

$thumbFileName = "$folder/thumb-$width-$fileName";

header('Content-Type: image/jpeg');

// Check if a thumb already exists, otherwise create a thumb
if (! file_exists($thumbFileName)) {
  $img = new imagick($imagePath);
  $img->setImageFormat($ext);
  $img->scaleImage($width, 0);
  //  $img->cropImage($width, $height, 0, 0);
  $img->writeImage($thumbFileName);
}

passthru("cat $thumbFileName");

?>
