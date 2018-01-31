<?php

/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimar�es.
 	Data de in�cio: 07/03/2016.
 	Data Atual: 15/03/2016.
*/

/* Inclui a Class de autoLoad */
require_once 'autoload.php';

/* Metodo requisitado */
switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
		cadastrar();
		break;
	case 'PUT':
		atualizar();
		break;
	case 'GET':
		get();
		break;
	case 'DELETE':
		deletar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
}

/* Metodos */
function cadastrar () {

	$data = json_decode($_POST['data']);
	
	$control = new UsuarioControl();
	$response = $control->cadastrar($data);
	
	echo json_encode( $response );
}
function atualizar () {

	parse_str(file_get_contents("php://input"), $_POST);
	$data = json_decode($_POST['data']);
	$usuario = json_decode($_POST['usuario']);
	
	$data->idempresa = $usuario->idempresa;
	
	$control = new UsuarioControl(new Usuario($data->id));
	$response = $control->atualizar($data);
	
	echo json_encode( $response );

}
function get () {		
	switch ($_GET['metodo']) {
		case 'listarTudoPaginado':
			listarTudoPaginado();
			break;
	}
}
function deletar () {

	parse_str(file_get_contents("php://input"), $_POST);
	$data = json_decode($_POST['data']);
	$usuario = json_decode($_POST['usuario']);
	
	$data->idempresa = $usuario->idempresa;

	$control = new UsuarioControl(new Usuario( $data->id));
	$response = $control->deletar($data);

	echo json_encode( $response );
}


function listarTudoPaginado () {
	$control = new UsuarioControl();
	$response = $control->listarTudoPaginado($_REQUEST['start'], $_REQUEST['limit']);
	echo json_encode($response);
}
