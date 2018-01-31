/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/

Ext.define('sgaf.view.MainPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.mainpanel',
	//requires: ['sgaf.views.home.newDashBoard'],
	activeTab: 0,
	items: [
		{
//			xtype: 'newdashboard',
			xtype: 'panel',
			closable: false,
			iconCls: 'home',
			title: 'Home',
			id:      'myHome',
		    listeners: {
		        'render': function()
		            {
		                Ext.Ajax.request({
		                    url: './app/view/home.html',
		                    success: function(response){
		                        Ext.getCmp('myHome').update( response.responseText );
		                    }
		                });                
		            }
		    }
		}
	]
});