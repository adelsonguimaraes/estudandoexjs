<?php
class Conexao{
    private $con;

    protected function __construct(){

        $this->con = mysqli_connect("localhost","root","", "fichacmm");
//         $this->con = mysqli_connect("mysql001.solverp.com.br","mysolverpdev","d3v3l0p*st0r@g3", "solverp_akto_dev");

        if (mysqli_connect_error()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

    }

    public static function getInstance(){
        static $instance = null;
        if (null === $instance){
            $instance = new static();

        }
        return $instance;
    }

    public function getConexao(){
        mysqli_query($this->con, "SET NAMES 'utf8'");
        mysqli_query($this->con, 'SET character_set_connection=utf8');
        mysqli_query($this->con, 'SET character_set_client=utf8');
        mysqli_query($this->con, 'SET character_set_result=utf8');
        return $this->con;
    }

    /*
     * 	Para chamar a conexao use:
     *
     *  $conexao = Conexao::getInstance()->getConexao();
     */


}