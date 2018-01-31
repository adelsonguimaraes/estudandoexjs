/*
 	Projeto: SGAF.
 	Project Owner: Giovanni Russo.
 	Gerente de Desenvolvimento: Nilton Caldas Jr.
 	Desenvolverdor: Adelson Guimarães.
 	Data de início: 07/03/2016.
 	Data Atual: 07/03/2016. 
*/

Ext.define('sgaf.util.Util', {
	statics : { // #1
	decodeJSON : function (text) { // #2
		var result = Ext.JSON.decode(text, true);
		if (!result){
			result = {};
			result.success = false;
			result.msg = text;
		}
		return result;
	},
	showErrorMsg: function (text) { // #3
		Ext.Msg.show({
			title:'Atenção!',
			msg: text,
			icon: Ext.Msg.ERROR,
			buttons: Ext.Msg.OK
		});
	}
	}
});