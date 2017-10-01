<?php

# display errors in output
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

$imagePath = $_GET['path'];

$width = $_GET['w'];
$height = $_GET['w'];

header('Content-Type: image/jpeg');
//header("Content-Length: " . filesize($name));

$image = file_get_contents($imagePath);
print($image);
?>
