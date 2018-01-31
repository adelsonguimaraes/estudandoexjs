<?php
/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimar�es.
 	Data de in�cio: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/

header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
header('Content-type:application/json; charset=utf-8');

// set time zone
date_default_timezone_set('America/Manaus');

/* Trata $_POST */
if (!$_POST) {
    $_POST = file_get_contents("php://input");
}

/*
	Require da Conex�o
*/
require_once("../../util/Conexao.php");
/*
 Require da Cadastro de Log
*/
require_once("../../util/CadLogSistema.php");
/*
 Require da Resolve erro mysql
*/
require_once("../../util/ResolveMysqlError.php");

require_once("../../util/dompdf/autoload.inc.php");

/*
	Fun��o AutoLoad, Carrega as Classes quando
	tenta-se criar uma nova instancia de uma Classe.
	Exemplo: new Cupom(), new UsuarioDAO(), new EmpresaControl()... 
*/
function carregaClasses($class)
{
    //echo $class . ' - ';
    if ($class != 'Dompdf' || $class != 'Dompdf\Dompdf' || $class != 'mPDF' || $class != '\Mpdf\Mpdf') {
        /*
            Verifica se existe "Control" no nome da classe
        */
        if (strripos($class, "Control")) {
            /*	require na Control */
            require_once("../control/" . $class . ".php");
        } /*
           Verifica se existe "Control" no nome da classe
       */
        else if (strripos($class, "DAO")) {
            /* Monta o nome da Bean */
            $bean = strtolower(substr($class, 0, strripos($class, "DAO")));
            /*	require na DAO */
            require_once("../model/" . $bean . "/" . $class . ".php");
            /*
               Se n�o for DAO nem Control � Model.
           */
        } else {
            /* Monta o nome da Bean */
            $bean = strtolower($class);
            /*	require na model */
            require_once("../model/" . $bean . "/" . $class . ".php");
        }
    }

}

/*
	Chama o AutoLoad
*/
spl_autoload_register("carregaClasses");

/*
	Geta o Rest
*/
function getRest($class)
{
    if ($class) {
        require_once $class . ".php";
    }
}