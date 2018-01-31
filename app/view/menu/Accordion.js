/*
 	Projeto: SOLVERP.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Fabiano Ferreira da Silva Costa.
 	Desenvolverdor: Adelson Guimarães Monteiro.
 	Data de início: 07/03/2016.
 	Data Atual: 10/03/2016. 
*/

Ext.define('sgaf.view.menu.Accordion',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainmenu',

	width: 400,
	layout: {
		type: 'accordion'
	},
	collapsible: false,
	hideCollapseTool: false,
	iconCls: 'sitemap',
	title: 'Menu',
	tools:[{
		itemId: 'refreshMenu',
	    type:'refresh',
	    tooltip: 'Refresh Menu'
	}]
});