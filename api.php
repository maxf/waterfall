<?php

function starts_with_img($path) {
  $components = explode(DIRECTORY_SEPARATOR, $path);
  $fileName = $components[count($components)-1];
  return strpos($fileName, "img") === 0;
}

function getDirContents($dir, &$results = array()){
  $files = scandir($dir);

  foreach($files as $key => $value){
    $shortPath = $dir.DIRECTORY_SEPARATOR.$value;
    if(!is_dir(realpath($shortPath))) {
      $results[] = $shortPath;
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
    if ($baseDir !== NULL) {
      $dir .= DIRECTORY_SEPARATOR.$baseDir;
    }
    $files = getDirContents($dir);
    $imgFiles = array_values(array_filter($files, "starts_with_img"));
    print(json_encode($imgFiles));
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
