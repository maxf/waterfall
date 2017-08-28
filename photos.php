<?php

function starts_with_img($filename) {
  return strpos($filename, "img") === 0;
}

$files = array_values(array_filter(scandir("uploads"), "starts_with_img"));
print(json_encode($files));

?>
