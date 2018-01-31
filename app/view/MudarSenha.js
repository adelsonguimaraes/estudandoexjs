/*
 Projeto: SGAF.
 Project Owner: Giovanni Russo.
 Gerente de Desenvolvimento: Nilton Caldas Jr.
 Desenvolvedor.: Fabiano Ferreira da Silva Costa.
 Desenvolverdor: Adelson Guimarães.
 Data de início: 07/03/2016.
 Data Atual: 21/03/2016.
 */

Ext.define('sgaf.view.MudarSenha',{

    extend:	'Ext.window.Window',
    alias:	'widget.mudarsenhaform',
    iconCls: 	'menu_icon_funcionario',
    title: 		'Mudar Senha',
    autoShow: 	true,
    flex: 1,

    items: [
        {
            xtype: 			'form',
            bodyPadding: 	10,
            defaults: {
                anchor: '100%',
                msgTarget: 'under'
            },

            items: [
                {
                    xtype: 		'textfield',
                    inputType : 'password',
                    name : 'senhaatual',
                    fieldLabel : 'Senha Atual',
                    maxLength : 15,
                    enableKeyEvents : true,
                    id : 'senhaatual',
                    value : ''
                },
                {
                    xtype: 		'textfield',
                    inputType : 'password',
                    name : 'novasenha',
                    fieldLabel : 'Nova Senha',
                    maxLength : 15,
                    enableKeyEvents : true,
                    id : 'novasenha',
                    value : ''
                },
                {
                    xtype: 		'textfield',
                    inputType : 'password',
                    name : 'repetesenha',
                    fieldLabel : 'Repita a Senha',
                    maxLength : 15,
                    enableKeyEvents : true,
                    id : 'repetesenha',
                    value : ''
                },


            ]
        }
    ],

    dockedItems: [
        {
            xtype:	'toolbar',
            dock:		'bottom',
            layout: {
                type:	'hbox',
                pack:	'end'
            },
            items: [
                {
                    xtype: 	'button',
                    text: 	'Cancelar',
                    itemId: 	'btnCancelaMudarSenha',
                    iconCls: 	'icon-reset'
                },
                {
                    xtype: 	'button',
                    text: 	'Salvar',
                    itemId: 	'btnMudarSenha',
                    iconCls: 	'icon-save'
                }
            ]
        }
    ]
});