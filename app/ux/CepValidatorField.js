/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Data de início: 07/03/2016.
    Data Atual: 17/05/2017.
 */

Ext.define('sgaf.ux.CepValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.cepvalidatorfield'],
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
         cpfText: "CEP inválido!"
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
      var input = me.inputEl.dom;

      if ( input.value === "") {
         input.value = "";
      }else{
         // mascará CPF
         var h = input.value.replace(/\D/g, "");
         var a = h.length;
         var temp = "";
         ( a >= 0 ) ? temp += h.substr(0, 5) : "";
         ( a >= 6 ) ? temp += '-' + h.substr(5, 3) : "";
         h = temp;

         input.value = h;
      }
   },
   clear: function() {
      var me = this;
      var a = me.inputEl.dom;
      if ( !me.validar(a.value) ) {
         sgaf.util.Util.showErrorMsg( 'CEP Inválido! Tente novamente!' ); // Mostra msg de erro
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
      
      // mascará 69078-091
      var temp = "";
      ( a >= 0 ) ? temp += h.substr(0, 5) : "";
      ( a >= 6 ) ? temp += '-' + h.substr(5, 3) : "";
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
      if ( s.length < 8 ) {
         return false;
      }

      return true;
   }
});