/*
 Projeto: SGAF.
 Project Owner: Giovanni Russo.
 Gerente de Desenvolvimento: Nilton Caldas Jr.
 Desenvolverdor: Fabiano Ferreira da Silva Costa.
 Desenvolverdor: Adelson Guimarães Monteiro.
 Data de início: 07/03/2016.
 Data Atual: 10/03/2016.
 */

Ext.define('sgaf.store.Menu',{
	extend: 'Ext.data.Store',

	requires: [
		'sgaf.model.menu.Root'
	],

	model: 'sgaf.model.menu.Root',

	proxy: {
		type: 'ajax',
		url: api+'/libs/js/menuJSON.js',

		reader: {
			type: 'json',
			root: 'items'
		}
	}
})