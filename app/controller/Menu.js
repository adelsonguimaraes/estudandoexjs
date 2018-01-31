/*
 	Projeto: SOLVERP.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Fabiano Ferreira da Silva Costa.
 	Desenvolverdor: Adelson Guimarães Monteiro.
 	Data de início: 07/03/2016.
 	Data Atual: 10/03/2016. 
*/

Ext.define('sgaf.controller.Menu',{
	extend: 'Ext.app.Controller',

	requires: [
		//'crm.view.security.Users'
	],

	models: [
		'menu.Root',
		'menu.Item'
	],

	stores: [
		'Menu',
		// 'TelaUsuarioRotina'
	],

	views: [
		'menu.Accordion',
		'menu.Item',
	],

	refs: [{
		ref: 'mainPanel',
		selector: 'mainpanel'
	}],

	init: function(application){
		this.control({
			"mainmenu": {
				render: this.onPanelRender
			},
			"mainmenuitem": {
//				select: this.onTreepanelSelect,
				itemclick: this.onTreepanelItemClick
			},
			"mainmenu #refreshMenu": {
				click: this.refreshMenu
			},
		});
	},

	
	refreshMenu: function () {
		Ext.ComponentQuery.query('mainmenu')[0].removeAll();
		this.onPanelRender();
	},
	
	onPanelRender: function(abstractcomponent, options){
		
		// var session = sessionUsuario.getLocal();
		// var usuario = Ext.encode(session.usuario);
		// this.getMenuStore().getProxy().setExtraParam('metodo','listarPorPerfilUsuarioEmpresa');
		// this.getMenuStore().getProxy().setExtraParam('usuario',usuario);
		
		Ext.ComponentQuery.query('mainmenu #refreshMenu')[0].hide();
		
		this.getMenuStore().load(function(records, op, success){
			var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];

			Ext.each(records, function(root){
				// Menus

				/*
					Verifica se o Usuário tem Permissão para ver o menu.
					OBS: CASO SEJA ADM TEM PERMISSÃO PARA TUDO.
				*/
				// if ( session.usuario.perfil === 'ADMIN' || session.usuario.perfil === root.raw.perfil ) {
					var menu = Ext.create('sgaf.view.menu.Item',{
						title: root.raw.descricao,
						// iconCls: 'menu_icon_crm',
						iconCls: 'sitemap'
					});
					// Item Menu
					Ext.each(root.raw.item, function (item) {
						menu.getRootNode().appendChild(item);
					});

					menuPanel.add(menu);
				// };
			});
		});
		
	},

	onTreepanelSelect: function(selModel, record, index, options){

		
		var mainPanel = this.getMainPanel();

		var newTab = mainPanel.items.findBy(
			function(tab){
				return tab.title === record.get('text');
			});

		if(!newTab){
			newTab = mainPanel.add({
				xtype: record.raw.className, 
				closable: true,
				iconCls: record.get('iconCls'),
				title: record.get('text')
			});
		}
		
		mainPanel.setActiveTab(newTab);
		
	},

	onTreepanelItemClick: function(view, record, item, index, event, options){
		if(record.get('leaf') === false) return false;
		this.onTreepanelSelect(view, record, index, options);
	},

});
