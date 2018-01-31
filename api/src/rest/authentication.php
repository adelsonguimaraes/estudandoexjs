<?php
session_start();

// header("Access-Control-Allow-Origin: *");

/* Inclui a Class de autoLoad */
require_once 'autoload.php';

/*
  Backup do Banco
*/
// require_once("../../util/dump.php");

// require_once '../../../api/util/Conexao.php';
//var_dump(json_decode($_POST['data']));
/*
	Verifica métodos requisitado
*/
switch ($_POST['metodo']) {
    case 'logar':
        logar();
        break;
        
    case 'trocarempresa':
       	trocarEmpresa();
       	break;
    case 'mudarsenha':
        mudarSenha();
        break;

    case 'salvaempresafavorita':
        salvaEmpresaFavorita();
        break;
        
    case 'listaempresasusuario': 
    	listarEmpresasUsuario();

    default:
        break;
}

/*
	Metodos
*/

function logar() {

    $con = Conexao::getInstance()->getConexao();

    $data = $_POST;

    $pass= $data['senha'];
    $userName = $data['usuario']; 

    $userName = stripslashes       ( strip_tags( trim( $userName ) ) ); 
    $pass = stripslashes ( strip_tags( trim( $pass ) ) ); 

    $userName = mysqli_real_escape_string( $con, $userName ); 
    $pass = mysqli_real_escape_string ( $con ,$pass ); 
    
    $objUsuario = new Usuario(); 
    $objUsuario->setUsuario($userName); 
    $objUsuario->setSenha($pass);
	
    $usuarioControl = new UsuarioControl($objUsuario);
	$response = $usuarioControl->logar();
	
	echo json_encode( $response );
}

function mudarSenha() {

    $con = Conexao::getInstance()->getConexao();

    $data = $_POST;

    $idusuario = $data['idusuario'];
    $senhaatual= $data['senhaatual'];
    $novasenha = $data['novasenha'];

    $usuarioControl = new UsuarioControl();
    $response = $usuarioControl->mudarSenha($idusuario, $senhaatual, $novasenha);

    echo json_encode( $response );
}

function trocarEmpresa() {

	$data = $_POST;
	
	$objUsuario = new Usuario();
	$objUsuario->setIdperfilusuarioempresa($data['idperfilusuarioempresa']);

	$usuarioControl = new UsuarioControl($objUsuario);
	$response = $usuarioControl->trocarEmpresa();

	// $result = array(
	// 		"success"   => true,
	// 		"msg"       => "logado",
	// 		"metodo"    => "logar",
	// 		"data"      => $usuario = array('idusuario'=>$dados->idusuario,'usuario'=>$dados->usuario, 'idperfilusuarioempresa'=>$dados->idperfilusuarioempresa, 'idempresa'=>$dados->idempresa, 'nomeempresa'=>$dados->nomeempresa, 'trocarempresa'=>'', 'inatividade'=>'ativo')
	// );

	echo json_encode( $response );
}

function listarEmpresasUsuario() {
	$data = $_POST;
	$usuarioControl = new UsuarioControl(new Usuario($data['idusuario']));
	$result = $usuarioControl->listarEmpresasUsuario();
	
	// $result = array(
	// 		"success"   => true,
	// 		"msg"       => "sucesso",
	// 		"data"      => $empresas
	// );
	
	echo json_encode($result);
}

function salvaEmpresaFavorita() {
	$data = $_POST;
	$objUsuario = new Usuario();
	$objUsuario->setId($data['idusuario']);
	$objUsuario->setIdperfilusuarioempresa($data['idperfilusuarioempresa']);
	$controlUsuario = new UsuarioControl($objUsuario);
	$controlUsuario->atualizarEmpresaFavorita();
	
	$result = array("success"=>true, "msg"=>"sucesso");
	
	echo json_encode($result);
}