<?php

/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimar�es.
 	Data de in�cio: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/

Class UsuarioDAO {
	/* Atributos */
	private $con;	//conexao
	private $sql; 	//sql
	private $obj; 	//obj da class
	private $lista = array(); //lista da class
    private $superdao;
	
	/* Construtor */
	public function __construct($con) {
		$this->con = $con;
        $this->superdao = new SuperDAO('usuario');
	}
	
	
	/* Cadastrar */
	function cadastrar ( $data ) {
		$this->sql = sprintf("INSERT INTO usuario (usuario, senha, perfil) values ('%s', '%s', '%s')",
				mysqli_real_escape_string($this->con, $data->usuario),
				mysqli_real_escape_string($this->con, $data->senha),
				mysqli_real_escape_string($this->con, $data->perfil)
			);
		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario', 'Cadastrar' ) );
		}else{
			$id = mysqli_insert_id( $this->con );

			$usuario = json_decode($_POST['usuario']);
			$data->id = $id;
			$jsonAntes = json_encode( $data );
			$jsonDepois = json_encode( $data );
			
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $id );
		}
		return $this->superdao->getResponse();
	}
	
	/* Atualizar */
	function atualizar ($data) {

		$this->sql = sprintf("UPDATE usuario set usuario = '%s', senha = '%s', perfil = '%s', ativo = '%s', dataedicao = '%s' where id = %d",
				mysqli_real_escape_string($this->con, $data->usuario),
				mysqli_real_escape_string($this->con, $data->senha),
				mysqli_real_escape_string($this->con, $data->perfil),
				mysqli_real_escape_string($this->con, $data->ativo),
				mysqli_real_escape_string($this->con, date('Y-m-d hh:mm:ii')),
				mysqli_real_escape_string($this->con, $data->id)
		);
		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario', 'Atualizar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );

			/* LogSistema */
			$usuario = json_decode( $_POST['usuario'] );
			$jsonAntes = json_encode( $data );
			$jsonDepois = json_encode( $data );
			
		}
		return $this->superdao->getResponse();
	}
	
	function buscarPorId (Usuario $obj) {
		
		$this->sql = sprintf("SELECT * FROM usuario WHERE id = %d",
				mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);
		
		$this->superdao->resetResponse();

		if( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'BuscarPorId' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				$this->obj = $row;
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->obj );
		}
		return $this->superdao->getResponse();
	}

	function mudarSenha ( $idusuario, $senhaatual, $novasenha ) {
        $this->sql = sprintf("SELECT * FROM usuario WHERE id = %d AND senha = '%s'",
            mysqli_real_escape_string($this->con,$idusuario),
            mysqli_real_escape_string($this->con, $senhaatual)
        );
        $result = mysqli_query($this->con, $this->sql);

        $this->superdao->resetResponse();

        if ( !$result ) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario' , 'mudarSenha' ) );
        }else {
            while ($row = mysqli_fetch_assoc($result)) {
                $this->obj = $row;

                $query = sprintf("UPDATE usuario SET senha = '%s' WHERE id = %d",
                    mysqli_real_escape_string($this->con,$novasenha),
                    mysqli_real_escape_string($this->con, $row['id'])
                );
//                var_dump($query);
                mysqli_query($this->con, $query);
                $this->superdao->setSuccess( true );
                $this->superdao->setData( $this->obj );
                $this->superdao->setTotal( $this->qtdTotal() );
            }
        }
        return $this->superdao->getResponse();
    }
	
	function listarTudoPaginado ( $start, $limit ) {
		
		$this->sql = "SELECT * from usuario limit $start, $limit";

		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario' , 'listarTudoPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {
				array_push( $this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}
		return $this->superdao->getResponse();
	}

	/* Logar */
	function logar ( Usuario $obj ) {

		$this->sql = "SELECT * from usuario where usuario = '" .$obj->getUsuario(). "' and senha = '". $obj->getSenha()."' and ativo = 'SIM'";
		$result = mysqli_query( $this->con, $this->sql );

		$this->superdao->resetResponse();
		
		if( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Logar' ) );
		}else{
			$usuario = [];
			while( $row = mysqli_fetch_object( $result) ) {
				$usuario = array(
					'idusuario'=>$row->id,
					'usuario'=>$row->usuario,
					'perfil'=>$row->perfil, 
					'trocarempresa'=>'',
					'inatividade'=>'ativo'
				);
			}
			if (empty($usuario)) {
				$this->superdao->setMsg( "Usuário ou Senha incorretos!" );
				return $this->superdao->getResponse();
			}

			$this->superdao->setSuccess( true );
			$this->superdao->setData( $usuario );
		}
		return $this->superdao->getResponse();
	}

	/* Deletar */
	function deletar ($data) {
		$obj = new Usuario( $data->id );

		$this->superdao->resetResponse();

		// buscando por dependentes
        $dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
		    $this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$resp = $this->buscarPorId( $obj ); // busca o valor atual
		if ( $resp['success'] == false ) return $resp; // se false
		$jsonAntes = json_encode( $resp['data'] ); // json antes

		$this->sql = sprintf("call sp_deletaUsuario(%d, %d, %d)",
				mysqli_real_escape_string($this->con, $data->id),
				mysqli_real_escape_string($this->con, $data->idempresa),
				mysqli_real_escape_string($this->con, $data->idperfil));
		$result = mysqli_query($this->con, $this->sql);
		
		if ( !$result ) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->superdao->setSuccess( true );
		$this->superdao->setData( true );

		/* LogSistema */
		$usuario = json_decode($_POST['usuario']);
		$jsonDepois = $jsonAntes;
		CadastraLogSistema(get_class($obj), $obj->getId(), "CRITICO", "EXCLUIR", $jsonAntes, $jsonDepois, $usuario);
		
		return $this->superdao->getResponse();
	}

	/*-- Quantidade Total --*/
	function qtdTotal() {
		$this->sql = "SELECT count(*) as quantidade FROM usuario";
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$total = 0;
		while ( $row = mysqli_fetch_object ( $result ) ) {
			$total = $row->quantidade;
		}
		return $total;
	}
}