/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Fabiano Ferreira da Silva Costa.
 	Desenvolverdor: Adelson Guimarães Monteiro.
 	Data de início: 07/03/2016.
 	Data Atual: 10/03/2016. 
*/

Ext.define('sgaf.model.menu.Item',{
	extend: 'Ext.data.Model',

	uses: [
		'sgaf.model.menu.Root'
	],

	idProperty: 'id',

	fields: [
		{
			name: 'nome'
		},
		{
			name: 'icon'
		},
		{
			name: 'class'
		},
		{
			name: 'id',
		},
		{
			//name: 'parent_id'
			name: 'subrotina'
		}
	],

	belongsTo: {
		model: 'sgaf.model.menu.Root',
		foreignKey: 'subrotina'
	}
});