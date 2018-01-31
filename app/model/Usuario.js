Ext.define('sgaf.model.Usuario',{
	extend: 'Ext.data.Model',

	fields: [
		{name: 'id',  						type: 'int'},
		{name: 'perfil', 					type: 'string'}, // perfil quando o adm seleciona o usuário na grid
		{name: 'usuario',					type: 'string'},
		{name: 'senha',  					type: 'string'},
		{name: 'ativo',  					type: 'string'},
		{name: 'datacadastro', 				type: 'date' , dateFormat: 'c'},
		{name: 'dataedicao', 				type: 'date' , dateFormat: 'c'}
	]
	
});