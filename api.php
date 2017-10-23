<?php

# display errors in output
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);


function createDate($path) {
  $exif = @exif_read_data($path, 'ANY_TAG');
  if ($exif && array_key_exists('DateTimeOriginal', $exif)) {
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
      if (!preg_match('/.*\/thumb-[^\/]+$/', $shortPath) && preg_match('/\.(jpg|JPG|jpeg|JPEG)$/', $shortPath)) {
        $results[] = array( 'path' => $shortPath, 'date' => createDate($shortPath) );
      }
    }
  }
  return $results;
}

$dir = "uploads";


switch($_GET['cmd']) {
  case "scan":
    header('Content-Type: application/json');
    $baseDir = $_GET['dir'];
    if ($baseDir) {
      $dir .= DIRECTORY_SEPARATOR.$baseDir;
    }
    print(json_encode(getDirContents($dir)));
    break;

  case "dirs":
    header('Content-Type: application/json');
    $files = scandir($dir);
    $dirs = [];
    foreach($files as $key => $value){
      if ($value[0] != "." && is_dir(realpath($dir."/".$value))) {
        array_push($dirs, $value);
      }
    }
    print(json_encode($dirs));
    break;

  case "del":
    $fileName = $_GET['file'];
    if ($fileName) {
      if (unlink($fileName)) {
        header('Content-Type: text/plain');
        print('"'.$fileName.'"');
      } else {
        http_response_code(404);
        print("Failed to delete file" . $fileName);
      }
    } else {
      http_response_code(400);
    }
    break;

  case "rss":
    header('Content-Type: application/rss+xml');
    $baseDir = $_GET['dir'];
    if ($baseDir) {
      $dir .= DIRECTORY_SEPARATOR.$baseDir;
    }
    $photos = getDirContents($dir);
    print("<?xml version='1.0' encoding='UTF-8' ?>\n");
    print("<feed xmlns='http://www.w3.org/2005/Atom'>");
    print(" <title>RSS Title</title>\n");
    print(" <link href='http://lapin-bl.eu/waterfall'/>\n");
    print(" <updated>2003-12-13T18:30:02Z</updated>\n");
    print(" <author><name>John Doe</name></author>\n");
    foreach ($photos as $photo) {
      print("  <entry>\n");
      print("    <title>Example entry</title>\n");
      print("    <summary>Here is some text containing an interesting description.</summary>\n");
      print("    <link href='http://www.example.com/blog/post/1'/>\n");
      print("    <updated>Sun, 06 Sep 2009 16:20:00 +0000</updated>\n");
      print(" </entry>\n");
    };
    print("</feed>\n");
    break;

  default:
    print "[]";
}


?>
