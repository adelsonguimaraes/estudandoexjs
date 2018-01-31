/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Data de início: 07/03/2016.
    Data Atual: 07/03/2016. 
*/


Ext.define('sgaf.view.MenuPrincipal',{
	
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.menuprincipal',
	width   : 500,
    items: [
        {
        	xtype: 'splitbutton',
            text : 'Cadastros',
            menu : Ext.create('Ext.menu.Menu',{
            	items: [
            	        {
            	        	text: 'Pessoa Fisica',
            	        },{
            	        	text: 'Usuario'
            	        },{
            	        	text: 'Permissões'
            	        }
            	]
            })
        },
        '-',
        {
            xtype: 'splitbutton',
            text : 'Split Button'
        },
        '-',
        {
        	text:'Sobre'
        },
        '->',
        {
            xtype    : 'textfield',
            name     : 'field1',
            emptyText: 'enter search term'
        }
    ]
});
