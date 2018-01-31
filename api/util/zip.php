<?php

/*
	Zipa diretórios e arquivos,
	força o download
	deleta os arquivos após download
*/

function ZCompact($zip, $cwd) {
    $open = opendir($cwd);

    while($folder = readdir($open))
    {
        if ($folder != '.' && $folder != '..'){
            if (is_dir($cwd.'/'.$folder))
            {
                $name = str_replace('../', '', $cwd) . "/" . $folder; 
                $dir = ($cwd.'/'.$folder);
                $zip->addEmptyDir($name);
                ZCompact($zip, $dir);
            }
            elseif (is_file($cwd.'/'.$folder))
            {
                $name = str_replace('../', '', $cwd) . "/" . $folder;
                $arq = ($cwd.'/'.$folder);
               	$zip->addFile($arq, $name);                                      
            }
        }
    }
}

function down ($file) {
	// Configuramos os headers que serão enviados para o browser
	header('Content-Description: File Transfer');
	header('Content-Disposition: attachment; filename="'.$file.'"');
	header('Content-Type: application/octet-stream');
	header('Content-Transfer-Encoding: binary');
	header('Content-Length: ' . filesize($file));
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	header('Pragma: public');
	header('Expires: 0');

	// Envia o arquivo para o cliente
	if (readfile($file) !== false) {
		// destroi
		unlink($file);
	}
}

$nome = $_GET['nome'];
$caminho = '../' . $_GET['caminho'];
// $caminho = $_SERVER['DOCUMENT_ROOT'] . $_GET['caminho'];
$file = $nome . '.zip';

// echo $caminho; exit;


$zip = new ZipArchive();
if ($zip->open($file, ZIPARCHIVE::CREATE) === true){
    ZCompact($zip, $caminho);
    $zip->close();
    down($file);
}



?>