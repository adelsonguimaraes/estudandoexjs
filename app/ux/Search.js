Ext.define('sgaf.ux.Search', {
	extend: 'Ext.form.field.Text',
	alias: 'widget.search',
	fieldLabel: 'Filtrar',
	labelWidth: 50,
	itemId: 'filtro',
	emptyText: 'Filtrar na Grid',
	value: '',
	title: 'aqui',
	width: 250,
	// listeners: {
	// 	keyup: {
	// 		element: 'el', //bind to the underlying el property on the panel
 //            fn: function( field, e, eOpts ) { 
 //            	var input = field.target.value;
	// 			var id = field.target.id.substr(0, field.target.id.indexOf('-') );
	// 			var store = Ext.getStore( Ext.ComponentQuery.query( id )[0].myStore );
	// 			console.log( store );
	// 			init ( input, store );				
	// 		}
	// 	}
	// }
	init: function  ( input, store ) {
		var control = this;
		if ( input.trim().length > 0 ) {
			store.filterBy(function (record) {
				return control.percorreColunas( record, input );
			});
		}else{
			store.clearFilter();
		}
	},

	percorreColunas: function ( record, input ) {
		var control = this;
		var count = 0;
		var array = [];
		for( var item in record.raw ) {
			// capturando o conteúdo de uma coluna
			var temp = '';
			// var count = 0;
			if ( typeof( record.get( item ) ) === 'string' ) {
				temp = record.get( item );
			}else if ( typeof( record.get( item ) ) === 'number' ) {
				temp = record.get( item ).toString();
			}else if ( typeof( record.get( item ) ) === 'object' ) {
				var data = moment(record.get( item )).format('DD/MM/YYYY');
				if ( data !== 'Invalid date' ) {
					temp = data;
				}
			}
			
			if ( control.removeAcentos ( temp ).indexOf( control.removeAcentos ( input ) ) !== -1 ) {
				count++;
			}
			
		}
		if ( count > 0 ) {
			return record;
		}
	},

 	removeAcentos: function  ( strToReplace ) {
		strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
		strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
		var newStr = "";
		for (var i = 0; i < strToReplace.length; i++) {
		    if (strSChar.indexOf(strToReplace.charAt(i)) != -1) {
		        newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i, 1)), 1);
		    } else {
		        newStr += strToReplace.substr(i, 1);
		    }
		}

		return newStr.replace(/[^a-zA-Z 0-9]/g, '').toLowerCase();
	}
});

// function init ( input, store ) {
// 	if ( input.trim().length > 0 ) {
// 		store.filterBy(function (record) {
// 			return percorreColunas( record, input );
// 		});
// 	}else{
// 		store.clearFilter();
// 	}
// }

// function percorreColunas ( record, input ) {
// 	var count = 0;
// 	var array = [];
// 	for( var item in record.raw ) {
// 		// capturando o conteúdo de uma coluna
// 		var temp = '';
// 		// var count = 0;
// 		if ( typeof( record.get( item ) ) === 'string' ) {
// 			temp = record.get( item );
// 		}else if ( typeof( record.get( item ) ) === 'number' ) {
// 			temp = record.get( item ).toString();
// 		}else if ( typeof( record.get( item ) ) === 'object' ) {
// 			var data = moment(record.get( item )).format('DD/MM/YYYY');
// 			if ( data !== 'Invalid date' ) {
// 				temp = data;
// 			}
// 		}
		
// 		if ( removeAcentos ( temp ).indexOf( removeAcentos ( input ) ) !== -1 ) {
// 			count++;
// 		}
		
// 	}
// 	if ( count > 0 ) {
// 		return record;
// 	}
// }

// function removeAcentos ( strToReplace ) {
// 	strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
// 	strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
// 	var newStr = "";
// 	for (var i = 0; i < strToReplace.length; i++) {
// 	    if (strSChar.indexOf(strToReplace.charAt(i)) != -1) {
// 	        newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i, 1)), 1);
// 	    } else {
// 	        newStr += strToReplace.substr(i, 1);
// 	    }
// 	}

// 	return newStr.replace(/[^a-zA-Z 0-9]/g, '').toLowerCase();
// }
