/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Testes: Dayane Felix.
    Data de início: 07/03/2016.
    Data Atual: 22/09/2017.
 */

Ext.define('sgaf.ux.CelularValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.celularvalidatorfield'],
   requires: ['sgaf.util.Util'],
   
   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 11 : 15,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cel: function(b, a) {
            return me.validar(b);
         },
         celText: "Celular inválido!"
      });

      Ext.apply(me, { vtype: 'cel' });
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
         sgaf.util.Util.showErrorMsg( 'Celular Inválido! Tente novamente!' ); // Mostra msg de erro
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

      // mascará (92) 99999-9999
      var temp = "";
      ( a >= 0 ) ? temp += '(' + h.substr(0, 1) : "";
      ( a >= 2 ) ? temp += h.substr(1, 1) + ') ' : "";
      ( a >= 3 ) ? temp += h.substr(2, 5) : "";
      ( a >= 7 ) ? temp += '-' + h.substr(7, 4) : "";
      h = temp;

      e.value = h;
   },
   validar: function(e) {
      if (e == "")
         return true;
      var b;
      s = e.replace(/\D/g, "");
      
      if (parseInt(s, 10) == 0 || s.length < 11) {
         return false;
      }
      return true;
   }
});