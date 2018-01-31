<?php

  //Start Output buffering
  ob_start();

  //Load the Library
  require('./zip.lib.php');

  //Generate a new object
  $zipfile = new zipfile('archive.zip','./DeepDir.php', './extendedfpdf.php');

  //Add a plain text file as pdf
  $zipfile->addFileAsPDF('testfiles/plain_text.txt', 'Title', 'Author');

  //Add a complete dir (recursiv)
  $zipfile->addDirContent('./');

  //Add a single file
  $zipfile->addFileAndRead('testfiles/picture.jpg');

  //Output the new zip file
  echo $zipfile->file();

?>