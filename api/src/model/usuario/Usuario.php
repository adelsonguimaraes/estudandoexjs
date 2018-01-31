<?php

/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimar�es.
 	Data de in�cio: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/

Class Usuario implements JsonSerializable {
	/* Atributos */
	private $id;
	private $usuario;
	private $senha;
	private $perfil;
	private $ativo;
	private $datacadastro;
	private $dataedicao;

	/* Construtor */
	public function __construct
	(
		$id												= NULL,
		$usuario										= NULL,
		$senha											= NULL,
		$perfil 										= NULL,
		$ativo											= NULL,
		$datacadastro 									= NULL,
		$dataedicao 									= NULL
	)
	{
		$this->id						= $id;
		$this->usuario 					= $usuario;
		$this->senha 					= $senha;
		$this->perfil					= $perfil;
		$this->ativo 					= $ativo;
		$this->datacadastro 			= $datacadastro;
		$this->dataedicao 				= $dataedicao;
	}

	/*-- Getters and Setters --*/
	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	public function getUsuario() {
		return $this->usuario;
	}
	public function setUsuario($usuario) {
		$this->usuario = $usuario;
		return $this;
	}
	public function getSenha() {
		return $this->senha;
	}
	public function setSenha($senha) {
		$this->senha = $senha;
		return $this;
	}
	public function getPerfil() {
		return $this->perfil;
	}
	public function setPerfil($perfil) {
		$this->perfil = $perfil;
		return $this;
	}
	public function getAtivo() {
		return $this->ativo;
	}
	public function setAtivo($ativo) {
		$this->ativo = $ativo;
		return $this;
	}
	public function getDatacadastro() {
		return $this->datacadastro;
	}
	public function setDatacadastro($datacadastro) {
		$this->datacadastro = $datacadastro;
		return $this;
	}
	public function getDataedicao() {
		return $this->dataedicao;
	}
	public function setDataedicao($dataedicao) {
		$this->dataedicao = $dataedicao;
		return $this;
	}
	
	
	/* String */
	public function __toString () {
		return sprintf("Usu�rio: ID: %d, Usuario: %s", $this->id, $this->usuario);
	}
	
	/* Json */
	public function jsonSerialize () {
		return [
			"id"						=> $this->id,
			"usuario"					=> $this->usuario,
			"senha"						=> $this->senha,
			"perfil"					=> $this->perfil,
			"ativo"						=> $this->ativo,
			"datacadastro" 				=> $this->datacadastro,
			"dataedicao" 				=> $this->dataedicao
		];
	}
	
}

?>
