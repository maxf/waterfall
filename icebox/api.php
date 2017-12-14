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



function getDirContents($base, $dir, &$results = array()){
  $files = scandir("$base/$dir");

  foreach($files as $key => $value){
    $shortPath = "$dir/$value";
    $fullPath = "$base/$shortPath";
    if (is_dir(realpath($fullPath)) && $value[0] != ".") {
      getDirContents($base, $shortPath, $results);
    } else {
      if (preg_match('/\.(jpg|JPG|jpeg|JPEG)$/', $shortPath)) {
        $results[] = array( 'path' => $shortPath, 'date' => createDate($fullPath) );
      }
    }
  }
  return $results;
}

function deleteRelatedFiles($thumbsDir, $path) {
  $m = array();
  $r = preg_match('/(.*)\/([^\/]+)/', $path, $m);
  $fileDir = $m[1];
  $fileName = $m[2];
  $dirFiles = scanDir("$thumbsDir/$fileDir");
  $filesDeleted = [];
  foreach($dirFiles as $dirFileName) {
    if (strpos($dirFileName, $fileName)) {
      $fileToDelete = "$thumbsDir/$fileDir/$dirFileName";
      if (unlink($fileToDelete)) {
        array_push($filesDeleted, "$fileDir/$dirFileName");
      }
    }
  }
  return $filesDeleted;
}


$uploadsDir = "uploads";
$thumbsDir = "thumbnails";

switch($_GET['cmd']) {
  case "scan":
    header('Content-Type: application/json');
    $dir = $_GET['dir'];
    print(json_encode(getDirContents($uploadsDir, $dir)));
    break;

  case "dirs":
    header('Content-Type: application/json');
    $files = scandir("$uploadsDir");
    $dirs = [];
    foreach($files as $key => $value){
      if ($value[0] != "." && is_dir(realpath("$uploadsDir/$value"))) {
        array_push($dirs, $value);
      }
    }
    print(json_encode($dirs));
    break;

  case "del":
    $path = $_GET['file'];
    if ($path) {
      if (unlink($uploadsDir.$path)) {
        header('Content-Type: application/json');
        deleteRelatedFiles($thumbsDir, $path);
        print "\"$path\"";
      } else {
        http_response_code(404);
        print("Failed to delete file" . $path);
      }
    } else {
      http_response_code(400);
    }
    break;

  case "rss":
    header('Content-Type: application/rss+xml');
    $dir = $_GET['dir'];
    $photos = getDirContents($uploadsDir, $dir);
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
