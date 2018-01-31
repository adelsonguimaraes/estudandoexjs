/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Data de início: 07/03/2016.
    Data Atual: 17/05/2017.
 */

Ext.define('sgaf.ux.TelefoneValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.telefonevalidatorfield'],
   requires: ['sgaf.util.Util'],
   
   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 11 : 14,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cpf: function(b, a) {
            return me.validar(b);
         },
         cpfText: "CPF inválido!"
      });

      Ext.apply(me, { vtype: 'cpf' });
      me.callParent();
   },
   initEvents: function() {
      var me = this;
      var el = me.inputEl;

      el.on("keydown", me.stopEventFunction, me);
      el.on("keyup", me.format, me);
      el.on("keypress", me.stopEventFunction, me);
      el.on("focus", me.start, me);
      el.on("blur", me.clear, me);

      me.callParent();
   },
   KEY_RANGES: {
      numeric: [48, 57],
      padnum: [96, 105]
   },
   isInRange: function(a, b) {
      return a >= b[0] && a <= b[1];
   },
   stopEventFunction: function(a) {
      var me = this;

      var b = a.getKey();
      if (me.isInRange(b, me.KEY_RANGES.padnum)) {
         b -= 48;
      }
      if (((b >= 41 && b <= 122) || b == 32 || b == 8 || b > 186) && (!a.altKey && !a.ctrlKey)) {
         a.stopEvent();
      }
   },
   start: function() {
      var me = this;
      var a = me.inputEl.dom;
   },
   clear: function() {
      var me = this;
      var a = me.inputEl.dom;
      if ( !me.validar(a.value) ) {
         sgaf.util.Util.showErrorMsg( 'Telefone Inválido! Tente novamente!' ); // Mostra msg de erro
         a.value = "";
      }
      me.validate();
   },
   format: function(k) {
      var me = this;
      var e = me.inputEl.dom;
      
      var j = k.getKey();
      if (me.isInRange(j, me.KEY_RANGES.padnum)) {
         j -= 48;
      }
      var d = (me.isInRange(j, me.KEY_RANGES.numeric) ? String.fromCharCode(j) : "");
      var h = (e.value.replace(/\D/g, "").substr(0) + d).replace(/\D/g, "");
      
      var a = h.length;
      
      if (d == "" && a > 0 && j == 8) {
      	a--;
   	   h = h.substring(0, a);		 
   		k.stopEvent();
      }
      if (e.maxLength + 1 && a >= e.maxLength) {
         return false;
      }
      
      // mascará (92) 9999-9999
      var temp = "";
      ( a >= 0 ) ? temp += h.substr(0, 2) : "";
      ( a >= 2 ) ? temp += '(' + h.substr(0, 2) + ') ' : "";
      ( a >= 7 ) ? temp += '-' + h.substr(6, 10) : "";
      h = temp;

      e.value = h;
   },
   validar: function(e) {
      if (e == "")
         return true;
      var b;
      s = e.replace(/\D/g, "");
      if (parseInt(s, 10) == 0) {
         return false;
      }

      // var iguais = true;
      // for (i = 0; i < s.length - 1; i++){
      //    if (s.charAt(i) != s.charAt(i + 1)){
      //       iguais = false;
      //    }
      // }

      // if (iguais)
      //    return false;

      // var h = s.substr(0, 9);
      // var a = s.substr(9, 2);
      // var d = 0;
      // for (b = 0; b < 9; b++) {
      //    d += h.charAt(b) * (10 - b);
      // }
      // if (d == 0) {
      //    return false;
      // }
      // d = 11 - (d % 11);
      // if (d > 9) {
      //    d = 0;
      // }
      // if (a.charAt(0) != d) {
      //    return false;
      // }
      // d *= 2;
      // for (b = 0; b < 9; b++) {
      //    d += h.charAt(b) * (11 - b);
      // }
      // d = 11 - (d % 11);
      // if (d > 9) {
      //    d = 0;
      // }
      // if (a.charAt(1) != d) {
      //    return false;
      // }
      return true;
   }
});