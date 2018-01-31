<?php

class UsuarioControl {
	/* Atributos */
	protected $con;
	protected $obj;
	protected $objDAO;
	
	/* Contrutor */
	function __construct (Usuario $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new UsuarioDAO($this->con);
		$this->obj = $obj;
	}
	
	 /* Metodos */
	function cadastrar ( $data ) {
		return $this->objDAO->cadastrar( $data );
	}
	function atualizar ( $data ) {
		return $this->objDAO->atualizar( $data );
	}
	function listarTudoPaginado ( $start, $limit ) {
		return $this->objDAO->listarTudoPaginado( $start, $limit );
	}
	function mudarSenha ( $idusuario, $senhaatual, $novasenha ) {
        return $this->objDAO->mudarSenha( $idusuario, $senhaatual, $novasenha );
    }
	function deletar ( $data ) {
		return $this->objDAO->deletar( $data );
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId ($this->obj );
	}
	function logar () {
		return $this->objDAO->logar( $this->obj );
	}
}

?>