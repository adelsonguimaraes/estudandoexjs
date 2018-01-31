/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 23/11/2016. 
*/
Ext.define('sgaf.util.LoadingMsg', {
	statics: {
		count : 0,
		myVar : null,
		clock: '0 seg',

		startCountTimeResponse : function ( msg ) {
			msg = (msg === null) ? 'Resolvendo, aguarde!' : msg; // se a msg estiver vazia

			Ext.get(Ext.get(Ext.ComponentQuery.query('viewport')[0].getEl()).mask( '<center>'+msg + '<center><hr>Tempo de processamento: ' + sgaf.util.LoadingMsg.clock + ''));

			sgaf.util.LoadingMsg.myVar = setTimeout(function(){
		    	sgaf.util.LoadingMsg.count++;
			    var d = new Date(sgaf.util.LoadingMsg.count*1000);
			    var min = d.getMinutes();
			    var seg = d.getSeconds();
			    var r = '';
			    r += (min >= 1) ? min + ' min ' : '';
			    r += seg + ' seg';
			    sgaf.util.LoadingMsg.clock = r;
			    sgaf.util.LoadingMsg.startCountTimeResponse( msg );
		  	}, 1000);
		},

		stopCountTimeResponse: function () {
		  Ext.get(Ext.get(Ext.ComponentQuery.query('viewport')[0].getEl()).unmask());
		  sgaf.util.LoadingMsg.count = 0;
		  sgaf.util.LoadingMsg.clock = '0 seg';
		  clearTimeout(sgaf.util.LoadingMsg.myVar);
		}
	}
});