<?php

# display errors in output
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);


function createDate($path) {
  $exif = exif_read_data($path, 'ANY_TAG');
  if ($exif) {
    return strtotime($exif['DateTimeOriginal']);
  } else {
    // No exif. Look for date in filename if file was uploaded by us
    $m = array();
    $r = preg_match('/img_(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z[^\/]+/', $path, $m);
    if ($r == 1) {
      return strtotime("$m[1]:$m[2]:$m[3] $m[4]:$m[5]:$m[6]");
    } else {
      // No filename date. Take the file's mtime
      return filemtime($path);
    }
  }
}



function getDirContents($dir, &$results = array()){
  $files = scandir($dir);

  foreach($files as $key => $value){
    $shortPath = $dir.DIRECTORY_SEPARATOR.$value;
    if (is_dir(realpath($shortPath)) && $value != "." && $value != "..") {
      getDirContents($shortPath, $results);
    } else {
      if (preg_match('/\.(jpg|JPG|jpeg|JPEG)$/', $shortPath)) {
        $results[] = array( 'path' => $shortPath, 'date' => createDate($shortPath) );
      }
    }
  }
  return $results;
}

$dir = "uploads";

header('Content-Type: image/jpeg');

switch($_GET['cmd']) {
  case "scan":
    $baseDir = $_GET['dir'];
    if ($baseDir) {
      $dir .= DIRECTORY_SEPARATOR.$baseDir;
    }
    print(json_encode(getDirContents($dir)));
    break;

  case "dirs":
    $files = scandir($dir);
    $dirs = [];
    foreach($files as $key => $value){
      if ($value[0] != "." && is_dir(realpath($dir."/".$value))) {
        array_push($dirs, $value);
      }
    }
    print(json_encode($dirs));
    break;


  default:
    print "[]";
}


?>
