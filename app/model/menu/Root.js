/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Fabiano Ferreira da Silva Costa.
 	Desenvolverdor: Adelson Guimarães Monteiro.
 	Data de início: 07/03/2016.
 	Data Atual: 10/03/2016. 
*/

Ext.define('sgaf.model.menu.Root',{
	extend: 'Ext.data.Model',

	uses: [
		'sgaf.model.menu.Item'
	],

	idProperty: 'id',

	fields: [
		{
			name: 'nome',
		},
		{
			name: 'icon'
		},
		{
			name: 'id'
		}
	],

	hasMany: {
		model: 'sgaf.model.menu.Item',
		foreignKey: 'subrotina',
		name: 'items'
	}
});