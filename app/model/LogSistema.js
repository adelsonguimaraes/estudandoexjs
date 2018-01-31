Ext.define('sgaf.model.LogSistema', {
	extend: 'Ext.data.Model',
	
	fields: [
	    {name: 'id', 						type: 'int'},
		{name: 'idusuario',				 	type: 'int'},
		{name: 'historico', 				type: 'string'},
	    {name: 'datacadastro', 				type: 'date', dateFormat: 'c'},

	    // para exibir na grid / extras
	    {name: 'usuario', type: 'string'}
	]
});