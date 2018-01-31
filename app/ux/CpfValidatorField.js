/*
    Projeto: SGAF.
    Project Owner: Giovanni Russo.
    Gerente de Desenvolvimento: Nilton Caldas Jr.
    Desenvolverdor: Adelson Guimarães.
    Data de início: 07/03/2016.
    Data Atual: 01/04/2016.
 */

Ext.define('sgaf.ux.CpfValidatorField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.cpfvalidatorfield'],
   requires: ['sgaf.util.Util'],
   
   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 11 : 14,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cpf: function(b, a) {
            return me.validacpf(b);
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
      el.on("keyup", me.formatCPF, me);
      el.on("keypress", me.stopEventFunction, me);
      el.on("focus", me.startCPF, me);
      el.on("blur", me.clearCPF, me);

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
   startCPF: function() {
      var me = this;
      var input = me.inputEl.dom;

      if ( input.value === "") {
         input.value = "";
      }else{
         // mascará CPF
         var h = input.value.replace(/\D/g, "");
         var a = h.length;
         var temp = "";
         ( a >= 0 ) ? temp += h.substr(0, 3) : "";
         ( a >= 4 ) ? temp += '.' + h.substr(3, 3) : "";
         ( a >= 6 ) ? temp += '.' + h.substr(6, 3) : "";
         ( a >= 9 ) ? temp += '-' + h.substr(9, 2) : "";
         h = temp;

         input.value = h;
      }

   },
   clearCPF: function() {
      var me = this;
      var a = me.inputEl.dom;
      if ( !me.validacpf(a.value) ) {
         sgaf.util.Util.showErrorMsg( 'CPF Inválido! Tente novamente!' ); // Mostra msg de erro
         a.value = "";
      }
      var idcliente = parseInt(this.up('form').getValues().id);
      var result = sgaf.util.VerificaDuplicidadeCpfCnpj.duplicidade(a.value, idcliente);

      if (result === false) a.value = '';
      me.validate();
   },
   formatCPF: function(k) {
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
      
      // mascará CPF
      var temp = "";
      ( a >= 0 ) ? temp += h.substr(0, 3) : "";
      ( a >= 4 ) ? temp += '.' + h.substr(3, 3) : "";
      ( a >= 6 ) ? temp += '.' + h.substr(6, 3) : "";
      ( a >= 9 ) ? temp += '-' + h.substr(9, 2) : "";
      h = temp;

      e.value = h;
   },
   validacpf: function(e) {
      if (e == "")
         return true;
      var b;
      s = e.replace(/\D/g, "");
      if (parseInt(s, 10) == 0) {
         return false;
      }

      var iguais = true;
      for (i = 0; i < s.length - 1; i++){
         if (s.charAt(i) != s.charAt(i + 1)){
            iguais = false;
         }
      }

      if (iguais)
         return false;

      var h = s.substr(0, 9);
      var a = s.substr(9, 2);
      var d = 0;
      for (b = 0; b < 9; b++) {
         d += h.charAt(b) * (10 - b);
      }
      if (d == 0) {
         return false;
      }
      d = 11 - (d % 11);
      if (d > 9) {
         d = 0;
      }
      if (a.charAt(0) != d) {
         return false;
      }
      d *= 2;
      for (b = 0; b < 9; b++) {
         d += h.charAt(b) * (11 - b);
      }
      d = 11 - (d % 11);
      if (d > 9) {
         d = 0;
      }
      if (a.charAt(1) != d) {
         return false;
      }
      return true;
   }
});