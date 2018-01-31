/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 14/03/2016. 
*/

Ext.define('sgaf.util.TelaUsuarioController', {
	
	statics:{
		verify: function (data) {
			var store = Ext.getStore('TelaUsuarioRotina');
			var items = store.data.items;
			var response = false;
			var count = 0;
			
			for(var x in items) {
				
				if(data.tela === items[x].data.identificador) {
					switch (data.acao) {
						case 'ler': {
							if(items[x].data.ler === 'SIM') {
								return true;
							}else{
								return false;
							}
							break;
						}
						case 'cadastrar': {
							if(items[x].data.cadastrar === 'SIM') {
								return true;
							}else{
								Msg();
								return false;
							}
							break;
						}
						case 'atualizar': {
							if(items[x].data.alterar === 'SIM') {
								return true;
							}else{
								Msg();
								return false;
							}
							break;
						}
						case 'deletar': {
							if(items[x].data.deletar === 'SIM') {
								return true;
							}else{
								Msg();
								return false;
							}
							break;
						}
					}
				}else{
					count++;
				}
			}
			
			if(count>0) {
				 MsgError(data.tela);
				 return false;
			}
			
			function Msg () {
				Ext.Msg.show({
					title : 'Atenção!',
					msg : "Você não tem permissão para executar este procedimento!",
					icon : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
			
			function MsgError (tela) {
				Ext.Msg.show({
					title : 'Atenção!',
					msg : "A tela \"<strong>"+tela+"\"</strong>, não foi encontrada em \"TelaUsuarioRotina\" e talvez em \"TelaRotina\", possívelmente não está cadastrada no banco!",
					icon : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
			
			
	    }
	}

});