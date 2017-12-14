<?php

$uploadsDir = "uploads";

# display errors in output
ini_set('display_errors', 1);
error_reporting(E_ERROR);

$width = $_GET['w'];
//$height = $_GET['h'];
$imagePath = $_GET['path'];
$imageFullPath = "$uploadsDir/$imagePath";

if (!$imageFullPath) {
  http_response_code(500);
  die("You must specify the 'path' and 'w' query string params");
}

if ( ! file_exists($imageFullPath)) {
  http_response_code(500);
  die("Unable to process the requested file: $imageFullPath");
}

header('Content-Type: image/jpeg');

if (!$width) {
  passthru("cat \"$uploadsDir/$imagePath\"");
  exit;
}

$m = array();
$r = preg_match('/(.*)\/([^\/]+)/', $imagePath, $m);
$folder = $m[1];
$fileName = $m[2];

$thumbPath = "thumbnails/$folder";
$thumbFileName = "$thumbPath/thumb-$width-$fileName";



// Check if a thumb already exists, otherwise create a thumb
if (! file_exists($thumbFileName)) {
  $img = new imagick($imageFullPath);
  $img->scaleImage($width, 0);
  echo $img;
  mkdir($thumbPath, 0777, true);
  $img->writeImage($thumbFileName);
} else {
  passthru("cat \"$thumbFileName\"");
}


?>
