/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 23/11/2016. 
*/
Ext.define('sgaf.util.LoadingProcessamento', {
	statics: {
		count : 0,
		myVar : null,
		clock: '0 seg',
		win: null,

		start : function ( msg ) {
			msg = (msg === null) ? 'Resolvendo, aguarde!' : msg; // se a msg estiver vazia

			// Ext.get(Ext.get(Ext.ComponentQuery.query('viewport')[0].getEl()).mask( '<center>'+msg + '<center><hr>Tempo de processamento: ' + sgaf.util.LoadingProcessamento.clock + ''));

			var text = '<center>'+msg + '<center><hr>Tempo de processamento: ' + sgaf.util.LoadingProcessamento.clock;

			if ( sgaf.util.LoadingProcessamento.win === null ) {

				sgaf.util.LoadingProcessamento.win = Ext.create('Ext.window.Window', {
				// 	draggable: false,
					titleCollapse: true,
				    closable: false,
				    resizable: false,
					title: 'Processamento de Lote',
				    height: 100,
				    width: 400,
					x:window.innerWidth-410,
					y:window.innerHeight-110,
				    layout: 'fit',
				    items: {
						xtype: 'progressbar',
						text: '<h1>Processando</h1>',
					}
				}).show();

				sgaf.util.LoadingProcessamento.win.down('progressbar').wait({
					interval: 500, //bar will move fast!
				        // duration: 5000,
				        increment: 15,
				        text: text,
				        scope: this,
				        // fn: function(){
				        //     p.updateText('Done!');
				        // }
				});
			
			}

			sgaf.util.LoadingProcessamento.win.down('progressbar').updateText( text );

			sgaf.util.LoadingProcessamento.myVar = setTimeout(function(){
		    	sgaf.util.LoadingProcessamento.count++;
			    var d = new Date(sgaf.util.LoadingProcessamento.count*1000);
			    var min = d.getMinutes();
			    var seg = d.getSeconds();
			    var r = '';
			    r += (min >= 1) ? min + ' min ' : '';
			    r += seg + ' seg';
			    sgaf.util.LoadingProcessamento.clock = r;
			    sgaf.util.LoadingProcessamento.start( msg );
		  	}, 1000);
		},

		stop: function () {
		  // Ext.get(Ext.get(Ext.ComponentQuery.query('viewport')[0].getEl()).unmask());
		  // sgaf.util.LoadingProcessamento.win.close();
		  // sgaf.util.LoadingProcessamento.win = null;
		  sgaf.util.LoadingProcessamento.count = 0;
		  sgaf.util.LoadingProcessamento.clock = '0 seg';
		  clearTimeout(sgaf.util.LoadingProcessamento.myVar);
		  sgaf.util.LoadingProcessamento.setContent('nada');
		},

		setContent: function ( content ) {
			sgaf.util.LoadingProcessamento.win.removeAll();
			sgaf.util.LoadingProcessamento.win.add(
				Ext.create('Ext.form.Panel', {
					titlle: 'Deseja gerar remessa?',
					items: [
						{
							html: 'Teste de <b>HTML</b>'
						},
						{
							xtype: 'button',
							text: 'Sim'
						},
						{
							xtype: 'button',
							text: 'Não'
						}
					]
				})
			);
			sgaf.util.LoadingProcessamento.win.center();
		}
	}
});