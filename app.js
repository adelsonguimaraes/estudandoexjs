/*
 Projeto: SGAF.
 Project Owner: Giovanni Russo.
 Gerente de Desenvolvimento: Nilton Caldas Jr.
 Desenvolvedor: Adelson Guimarães.
 Desenvolvedor: Fabiano Costa.
 Data de início: 07/03/2016.
 Data Atual: 16/01/2017.
 */


Ext.Loader.setConfig({
	enabled: true,
	paths: {
		sgaf: 'app'
	}
});

Ext.application({
	name: 'sgaf',
	requires: [
		// 'sgaf.view.Login',
		// 'sgaf.util.SessionController'
	],
	views: [
		// 'Login'
	],
	controllers: [
		// 'Login', // 22/01/2018
		'Menu', // 22/01/2018
		// 'Usuario', // 22/01/2018
		// 'FichaCMM', // 24/01/2018
		// 'LogSistema' // 30/01/2018
	],
	init: function () {
		boasVindas = Ext.getBody().mask('Carregando... aguarde', 'splashscreen');
		boasVindas.addCls('splashscreen');
		Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
			cls: 'x-splash-icon'
		});

	},
	launch: function () {
		var task = new Ext.util.DelayedTask(function () {
			boasVindas.fadeOut({
				duration: 500, // 1000
				remove: true
			});
			boasVindas.next().fadeOut({
				duration: 500, //1500
				remove: true,
				listeners: {
					afteranimate: function (el, starttime, opts) {
						
						Ext.create('sgaf.view.Viewport');
					}
				}
			});
		});
		task.delay(500); //2500
	}
});