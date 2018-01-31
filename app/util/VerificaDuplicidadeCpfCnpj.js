/*
   Projeto: SOLVERP.
   Project Owner: Giovanni Russo.
   Gerente de Desenvolvimento: Nilton Caldas Jr.
   Desenvolverdor: Adelson Guimarães.
   Tester: Dayane Felix.
   Data de início: 07/03/2016.
   Data Atual: 27/11/2017. 
*/

Ext.define('sgaf.util.VerificaDuplicidadeCpfCnpj', {

   requires: [
      'sgaf.util.Util'
   ],

   statics: {

      duplicidade: function (num, idcliente) {
         s = num.toString().replace(/\D/g, "");

         var result = {success:false};

         var request = Ext.Ajax.request({
            url: api + '/src/rest/pessoa.php',
            defaultHeaders: {ContentType: 'application/json'},
            method: 'GET',
            async: false,
            params:
            {
               metodo: 'verificarCpfCnpj',
               num: s // cnpj

            }
         });

         result = Ext.JSON.decode(request.responseText, true);

         var response = true;

         /*
            Se o já existir o CNPJ e o ID for diferente do cadastrado
         */
         if ( result.success && result.total > 0 ) {
            if ( parseInt(idcliente) != parseInt(result.data[0].id) ) {
               sgaf.util.Util.showErrorMsg( 'CNPJ/CNPJ já está em uso no Sistema!' ); // Mostra msg de erro
               response = false;
            }
         }

         return response;
      }

   }

});