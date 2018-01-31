/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/


Ext.define('sgaf.view.Login', {
	extend : 'Ext.window.Window',

	alias : 'widget.login',
	autoShow : true,
	height : 170,
	width : 360,
	layout : {
		type : 'fit'
	},
	iconCls : 'key',
	title : 'Login',
	closeAction : 'hide',
	closable : false,
	items : [ {
		xtype : 'form',
		frame : false,
		bodyPadding : 15,
		defaults : {
			xtype : 'textfield',
			anchor : '100%',
			labelWidth : 60,
			allowBlank : false,
			// vtype : 'alphanum',
			minLength : 3,
			msgTarget : 'under',
		},
		items : [ {
			name : 'user',
			itemId: 'loginUser',
			fieldLabel : 'Usuário',
			maxLength : 25,
			value : ''
		}, {
			inputType : 'password',
			name : 'password',
			fieldLabel : 'Senha',
			maxLength : 15,
			enableKeyEvents : true,
			id : 'password',
			value : ''
		} ],
		dockedItems : [ {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ {

				xtype : 'button',
				itemId : 'cancel',
				iconCls : 'cancel',
				text : 'Cancel'
			}, {
				xtype : 'button',
				itemId : 'submit',
				formBind : true,
				iconCls : 'key-go',
				text : 'Entrar'
			} ]
		} ]
	} ]
});