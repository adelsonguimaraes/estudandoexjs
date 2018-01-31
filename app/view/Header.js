/*
 Projeto: SGAF.
 Project Owner: Giovanni Russo.
 Gerente de Desenvolvimento: Nilton Caldas Jr.
 Desenvolverdor: Adelson Guimarães.
 Data de início: 07/03/2016.
 Data Atual: 07/03/2016.
 */

Ext.define('sgaf.view.Header', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.appheader',

	// configuração
	height: 50,
	ui: 'footer',
	style: 'border-bottom: 4px solid #4c72a4;',

	// items
	items: [
		/*-- Titulo da aplicação --*/
		{
			xtype: 'label',
			html: '<div id="titleHeader"> <span style="margin-top: -50px;">  <img src="'+api+'/img/sencha.png" height="50"> </span></div>'
		},
		{
			xtype: 'form',
			itemId: 'form',
			layout: 'hbox',
			border: false,
			items: [
				// {
				// 	xtype: 'textfield',
				// 	itemId: 'barra-busca',
				// 	name: 'busca',
				// 	emptyText: 'Pesquisa Avançada',
				// 	width: 300
				// },
				// {
				// 	xtype: 'combo',
				// 	store: 'Busca',
				// 	name: 'classes',
				// 	displayField: 'descricao',
		        //     valueField: 'classe',
		        //     emptyText: 'Selecione',
		        //     multiSelect: true,
		        //     width: 100,
		        //     listeners: {
				//         'afterrender': function(combo){           
		        //             combo.getStore().load({
		        //             	callback : function(records, operation, success) {
				// 					if ( success ) {
				// 						combo.setValue( combo.getStore().getAt(0).get('classe') );
				// 					}
				// 				}

		        //             });
		        //         }
				//     }
				// },
				// {
				// 	xtype: 'button',
    //                 itemId: 'btnBusca',
    //                 // text: 'Buscar',
    //                 iconCls: 'icon-lupa',
    //                 cls: 'barra-busca'
				// }
			]
		},
		/*-- preenchimento da barra --*/
		{
			xtype: 'tbfill' //ou '->'
		},
		{
			xtype: 'label',
			itemId: 'empresaativa',
			html: 'Empresa: <b>Nuvio</b>',
			style: {
				background: '#b7cad7',
				padding: '5px 5px',
			}
		},
		/*-- Separador da barra de ferramentas --*/
		{
			xtype: 'tbseparator' //ou '-'
		},
		{
			text: 'Usuário',
			iconCls: 'menu_icon_usuario',
			itemId: 'menuheader',
			menu: {
				itemId: 'menuHeader',
				items: [
					{
						text: 'Meus Dados',
						iconCls: 'menu_icon_funcionario',
						itemId: 'meusdados',
						id: 'meusdados',
					},
					{
						text: 'Alterar Senha',
						iconCls: 'menu_icon_contabanco',
						itemId: 'mudarsenha',
						id: 'mudarsenha'
					},
					{
						xtype: 'tbfill'
					},
					'-',
					{
						text: 'Deslogar',
						itemId: 'logout',
						id: 'logout',
						iconCls: 'logout'
					}
				]
			}
		}
	]
});