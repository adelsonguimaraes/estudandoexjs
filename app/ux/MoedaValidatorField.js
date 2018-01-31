/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Testes: Dayane Felix.
    Data de início: 07/03/2016.
    Data Atual: 22/09/2017.
 */

Ext.define('sgaf.ux.MoedaValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.moedavalidatorfield'],
   requires: ['sgaf.util.Util', 'sgaf.util.FormataMoeda'],
   
   autocomplete: "off",
   soNumero: false,
   // maxLength: 24,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         moeda: function( b, a ) {
            var r = me.validar(b);
            this.moedaText = r.msg;
            return r.success;
         }
         // moedaText: ""
      });
      Ext.apply(me, { vtype: 'moeda' });
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
   maxValue : 0,
   minValue: 0,
   setValueMe: function ( val ) {
      /*
         Formatamos o valor para moeda do tipo Brasil
         e depois setamos o valor no campo
      */
      this.setValue( this.formataValor( val ) );
   },
   setMaxValue: function ( val ) {
      this.maxValue = val;
   },
   getMaxValue: function () {
      return this.maxValue;
   },
   setMinValue: function ( val ) {
      this.minValue = val;
   },
   getMinValue: function () {
      return this.minValue;
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
      a.value = me.formataValor( a.value );
   },
   clear: function() {
      var me = this;
      var a = me.inputEl.dom;
      // if ( !me.validar(a.value) ) {
      //    sgaf.util.Util.showErrorMsg( 'Celular Inválido! Tente novamente!' ); // Mostra msg de erro
      //    a.value = "";
      // }
      // me.validate(a.value);
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
      if (a >= 24) {
         return false;
      }

      /*
         adiciona ponto do decimal
      */
      h = h.substr(0, h.length-2) + '.' + h.substr(-2);

      e.value = me.formataValor( h );
   },
   formataValor: function ( val ) {
      /*
         Function formata valor Util
      */
      return sgaf.util.FormataMoeda.formataValor(val);
   },
   validar: function(e) {
      var r = {success: true, msg: ''};
      if (e == "")
         return true;
      var b;
      s = e.replace(/\D/g, "");
      s = s.substr(0, s.length-2) + '.' + s.substr(-2);

      if (parseFloat(s) == 0) {
         r.msg = 'O valor é inválido!';
         r.success = false;
      }
      if (parseFloat(s) > this.maxValue) {
         r.msg = 'O valor máximo é '+ this.formataValor(this.maxValue);
         r.success = false;
      }
      return r;
   },
});