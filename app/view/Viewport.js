/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Fabiano Ferreira da Silva Costa.
 	Desenvolverdor: Adelson Guimarães Monteiro.
 	Data de início: 07/03/2016.
 	Data Atual: 07/03/2016.
*/

Ext.define('sgaf.view.Viewport', {
	extend: 'Ext.container.Viewport',
	alias: 'widget.mainviewport',
	requires: [
		'sgaf.view.Header',
		'sgaf.view.MainPanel'
	],
	layout: {
		type: 'border'
	},
	items: [
		/* cabeçalho */
		{
			xtype: 'appheader',
			height: 60,
			// html: '<br>Gerenciamento de Contratos</span>',
			region: 'north'
		},
		/* menu esquerdo acorddion */
		{
			xtype: 'mainmenu',
			width: 250,
			collapsible: true,
			region: 'west',
			style: 'background-color:#8FB488;'
		},
		/* centro */
		{
			xtype: 'mainpanel',
			region: 'center'
		},
		/*-- Container que contem o rodape --*/
		{
			xtype: 'container',
			region: 'south',
			height: 30,
			style: 'border-top: 1px solid #4c72a4;',
			html: '<div id="titleHeader"><center><span style="font-size:10px;">Consulta Folha - '+window.location.hostname+'</span></center></div>'
		}
		//,
		/* rodape */
		// {
		// 	xtype: 'panel',
		// 	region: 'east',
		// 	width: 200,
		// 	collapsible: true,
		// 	split: true,
		// 	title: 'DashBoard',
		// 	iconCls: 'view',
		// 	// items: [{xtype:'proximoscontato'}]
		// }
	]
});