<?php

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


function is_image($path) {
  return !is_dir(realpath($path)) and preg_match('/\.(jpg|JPG|jpeg|JPEG)$/', $path);
}


function getDirContents($dir, &$results = array()){
  $files = scandir($dir);

  foreach($files as $key => $value){
    $shortPath = $dir.DIRECTORY_SEPARATOR.$value;
    if(is_image($shortPath)) {
      $results[] = array( 'path' => $shortPath, 'date' => createDate($shortPath) );
    } else if($value != "." && $value != "..") {
      getDirContents($shortPath, $results);
    }
  }
  return $results;
}


$dir = "uploads";

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
