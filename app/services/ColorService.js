/**
 * @project Hex To Smali
 * @version 1.0
 * @licence MIT
 * @author Leonidas Maroulis
 */
angular.module('HexToSmaliApp').service('ColorService', [ function() {

	  return {
	  	decimalToHex : _decimalToHex,
	    convertColor: _convertColor,
	    isValidRGBA: _isValidRGBA,
	    isValidSmali: _isValidSmali,
	    isValidDec: _isValidDec,
	    calculatePrevColor: _calculatePrevColor,
	    decimal2hex : _decimal2hex
	  }


     function _decimalToHex(dec){
	    dec = ('' + dec).replace(/-/,'');
	    var hex = "0123456789ABCDEF", result = '';
	    do {
	        result = hex.charAt(dec % 16) + result;
	        dec = Math.floor(dec / 16);
	    } while(dec > 0);
	    return result;
	}
 
	function _convertColor(color, isHex){
        if(typeof color === 'undefined'){
          return "";
        }
          var colorArr = color.split("");
          //if is hex value remove #
         if(isHex){
         	 colorArr.shift();
      	 }
          var resArr = [];
          for(var i=0;i<colorArr.length;i++){
            resArr.push(colorMap[colorArr[i].toUpperCase()]);
          }
          return resArr.join("");
   }

   function _isValidRGBA(sNum){
        return /^[0-9A-F]{8}$/.test(sNum)
   }
   function _isValidSmali(sNum){
        return /^-?0x[0-9A-F]+$/.test(sNum)
   }
   function _isValidDec(sNum){
        return /^-?\d+$/.test(sNum)
   }

   function _calculatePrevColor(hex) {
   		o = (parseInt(hex.substring(0,2), 16)/256).toFixed(2);
	    r = parseInt(hex.substring(2,4), 16);
	    g = parseInt(hex.substring(4,6), 16);
	    b = parseInt(hex.substring(6,8), 16);

	    return {
	    	color:'rgba('+r+','+g+','+b+','+o+')',
	    	opacity: o
	    };
   }


    function _decimal2hex(d){
	    d = ('' + d).replace(/-/,'');
	    var hex = "0123456789ABCDEF", result = '';
	    do {
	        result = hex.charAt(d % 16) + result;
	        d = Math.floor(d / 16);
	    } while(d > 0);
	    return result;
	}


}]);