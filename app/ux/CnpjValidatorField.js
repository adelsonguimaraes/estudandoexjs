/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Data de início: 07/03/2016.
    Data Atual: 01/04/2016.
 */

Ext.define('sgaf.ux.CnpjValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.cnpjvalidatorfield'],
   requires: ['sgaf.util.Util', 'sgaf.util.VerificaDuplicidadeCpfCnpj'],

   // variaveis de controle
   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 15 : 19,

   // quando inicia o componente
   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cnpj: function(b, a) {
            return me.verificaCNPJ(b);
         },
         cnpjText: "CNPJ não é válido!"
      });

      Ext.apply(me, { vtype: 'cnpj' });

      me.callParent();
   },

   // quando incia os eventos
   initEvents: function() {
      var me = this;
      var el = me.inputEl;

      el.on("focus", me.startCNPJ, me); //1
      el.on("keydown", me.stopEventFunction, me);
      el.on("keypress", me.stopEventFunction, me);
      el.on("keyup", me.formatCNPJ, me);
      el.on("blur", me.clearCNPJ, me);

      me.callParent();
   },
   // constat de teclas numericas e pad numericas
   KEY_RANGES: {
      numeric: [48, 57],
      padnum: [96, 105]
   },

   startCNPJ: function() {
      var me = this;
      var input = me.inputEl.dom;

      if (input.value == "") {
         input.value = "";
      }else{
         var h = input.value.replace(/\D/g, "");
         var a = h.length;
         var temp = "";
         
         ( a >= 0 ) ? temp += h.substr(0, 2) : ""; // 46
         ( a >= 3 ) ? temp += '.' + h.substr(2, 3) : ""; // .405
         ( a >= 6 ) ? temp += '.' + h.substr(5, 3) : ""; // .644
         ( a >= 9 ) ? temp += '/' + h.substr(8, 4) : ""; // /0001
         ( a >= 13 ) ? temp += '-' + h.substr(12, 2) : ""; // -60
         h = temp;
         input.value = h;
      }
   },
   stopEventFunction: function(a) {
      var me = this;
      var b = a.getKey();
      if (me.isInRange(b, me.KEY_RANGES.padnum)) {
         b -= 48; // valor de b - 48
      }
      if (((b >= 41 && b <= 122) || b == 32 || b == 8 || b > 186) && (!a.altKey && !a.ctrlKey)) {
         a.stopEvent();
      }
   },
   isInRange: function(a, b) {
      return a >= b[0] && a <= b[1];
   },
   clearCNPJ: function() {
      var me = this;
      var a = me.inputEl.dom;
      if (!me.verificaCNPJ(a.value)) {
         sgaf.util.Util.showErrorMsg( 'CNPJ Inválido! Tente novamente!' ); // Mostra msg de erro
         a.value = "";
      }
      var idcliente = parseInt(this.up('form').getValues().id);
      var result = sgaf.util.VerificaDuplicidadeCpfCnpj.duplicidade(a.value, idcliente);

      if (result === false) a.value = '';
      me.validate();
   },
   formatCNPJ: function(k) {
      var me = this;
      var e = me.inputEl.dom;

      var j = k.getKey();
      if (me.isInRange(j, me.KEY_RANGES.padnum)) {
         j -= 48;
      }

      var d = (me.isInRange(j, me.KEY_RANGES.numeric) ? String.fromCharCode(j) : ""); // reotorna a tecla clicada baseada no charcode
      var h = (e.value.replace(/\D/g, "").substr(0) + d).replace(/\D/g, ""); // limpa os caracteres

      var a = h.length; // pega o tamanho de caracteres
         
      /*
            Se o valor for ""
            o tamanho for = 0
            e a tecla digitada for backspace(8)
      */
      if (d == "" && a > 0 && j == 8) {
         a--;
         h = h.substr(0, a);
         k.stopEvent();
      }
      // se o tamanho passar do permitido
      if (e.maxLength + 1 && a >= e.maxLength) {
         return false;
      }
      //se o tamanho for igual 14
      if (a === 15) {
         return false;
      }
      
      // mascará CNPJ
      var temp = "";
      ( a >= 0 ) ? temp += h.substr(0, 2) : ""; // 46
      ( a >= 3 ) ? temp += '.' + h.substr(2, 3) : ""; // .405
      ( a >= 6 ) ? temp += '.' + h.substr(5, 3) : ""; // .644
      ( a >= 9 ) ? temp += '/' + h.substr(8, 4) : ""; // /0001
      ( a >= 13 ) ? temp += '-' + h.substr(12, 2) : ""; // -60
      h = temp;
      
      e.value = h;
      
   },
   verificaCNPJ: function(a) {
      var me = this;
      if (a == "") return true;

      a = a.replace(/\D/g, "");
      a = a.replace(/^0+/, "");
      if (parseInt(a, 10) == 0) {
         return false;
      } else {
         g = a.length - 2;
         if (me.testaCNPJ(a, g) == 1) {
            g = a.length - 1;
            if (me.testaCNPJ(a, g) == 1) {
               return true;
            } else {
               return false;
            }
         } else {
            return false;
         }
      }
   },
   testaCNPJ: function(a, d) {
      var b = 0;
      var e = 2;
      var c;
      for (f = d; f > 0; f--) {
         b += parseInt(a.charAt(f - 1),10) * e;
         if (e > 8) {
            e = 2;
         } else {
            e++;
         }
      }
      b %= 11;
      if (b == 0 || b == 1) {
         b = 0;
      } else {
         b = 11 - b;
      }
      if (b != parseInt(a.charAt(d),10)) {
         return (0);
      } else {
         return (1);
      }
   }
});