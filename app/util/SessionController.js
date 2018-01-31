/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 14/03/2016. 
*/

var host = window.location.hostname;
var sessionStorageName = host + '_session_solverp';
var localStorageName = host + '_local_solverp';

Ext.define('sessionUsuario', { 
    singleton: true,
    session: '',
    local: '',
    // functions
    getSession: function () { // geta session storage
    	return this.session;
    },
    setSession: function ( s ) { // set session storage
    	this.session = s;
    },
    getLocal: function () { // get local storage
    	return this.local;
    },
    setLocal: function ( l ) { // set local storage
    	this.local = l;
    },
    getUsuario: function () { // geta usuario de local storage
    	return this.local.usuario;
    },
    destroy: function () { // geta usuario de local storage
    	this.local = '';
    	this.session = '';
    }
});  


Ext.define('sgaf.util.SessionController', {
	
	statics:{
		// usado em troca de empresa
		setSessionStorage: function ( session ) {
			localStorage[ localStorageName ]	= Ext.encode(session);
			sessionStorage[ sessionStorageName ] = Ext.encode(session.usuario);
		},
		createSession: function (data, infinity) {
			//verifica se o cookie não foi marcado
			if(!infinity) infinity = false;
			//criar a sessionStorage com oss dados do data
	        sessionStorage[ sessionStorageName ] = JSON.stringify(data);
	        sessionUsuario.setSession( data );
	        //cria obj Date com a data atual
	        var now = new Date();
	        //criar o obj do localStorage sessionSgaf
	        var sessionSgaf = {
	            "usuario": 	data, //alimenta os dados da session usuario
	            "infinity": infinity, //passa true ou false para o cookie infinito
	            "dataExp": 	new Date(now.getTime()+50000) //passa a data atual + 1 minuto para dataExp
	        };
	
	        //cria o local storage
	        localStorage[ localStorageName ] = JSON.stringify(sessionSgaf);
	    	sessionUsuario.setLocal( sessionSgaf );
	    },

		sessionCtrl: function () {
		
			
			/*
				Function generica para as várias operaçõesss abaixo
			*/
			function atualizaLocalStorage () {
				//converte json string para obj e armazena em session.
				var session = JSON.parse( localStorage[ localStorageName ] );
				//cria um novo obj de data atual
				var now = new Date();
				//atualiza o tempo da sessão, a hora atual +5 minutos
				session.dataExp = new Date(now.getTime()+50000);
				//atualiza a sessionStorage mynuvio cupom
				localStorage[ localStorageName ] = JSON.stringify(session);
				sessionUsuario.setLocal( session );
				//converte o obj em json string e salva em sessionStorage
				sessionStorage[ sessionStorageName ] = JSON.stringify( session.usuario );
				sessionUsuario.setSession( session.usuario );
			}
		
			/*
				Verifica se existe sessionStore.usuario
			*/
			if(sessionStorage[ sessionStorageName ]) {
		
				atualizaLocalStorage();
				
			/*
				Caso não exista sessionStorage
			*/
			}else{
				/*
					Verifica se existe localStorage
				*/
				if( localStorage[ localStorageName ] ) {
					//converte json string para obj e armazena em session.
					var session = JSON.parse( localStorage[ localStorageName ] );
					/*
						Verifica se a sessão tem conf infinita,
						sendo que o usuario está sempre logado
					*/
					if(session.infinity) {
		
						atualizaLocalStorage();
		
					}else{
						//cria um novo obj de data atual
						var now = new Date();
						//converte a string data da sessao em obj
						var dataSessao = new Date(session.dataExp);
						/*
							Compara se o tempo de sessão ainda está no prazo,
							convertendo as duas datas em milisegundos
						*/
						if(now.getTime() <= dataSessao.getTime()) {
							
							atualizaLocalStorage();
						
						}else{
						
							this.logout();
						
						}//fim if data.getTime
					}//fim if session infinity
				}//fim de if localStorage
			}//fim if sessionStorage
		
		},
		
		logout: function () {
			if( sessionStorage[ sessionStorageName ] || localStorage[ localStorageName ] ) {
	            window.sessionStorage.removeItem( sessionStorageName );
		        window.localStorage.removeItem( localStorageName );
		        sessionUsuario.destroy();
		     }
	    }
	},

});