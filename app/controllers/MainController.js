/**
 * @project Hex To Smali
 * @version 1.0
 * @licence MIT
 * @author Leonidas Maroulis
 */
angular.module('HexToSmaliApp')
  .controller('MainController',MainController);

  MainController.$inject = [
            '$scope',
            '$rootScope',
            '$log',
            'appSettings',
            'ColorService'
        ];


    function MainController($scope, $rootScope, $log, appSettings,ColorService) {

      $rootScope.appSettings = appSettings;

      $scope.colors = {
          hex: "",
          smali: "",
          dec: "",
          preview: "",
          opacity: ""
      };

      resetValidations();

      $scope.methods= {
        isHexColor: function(){
            return ColorService.isValidSmaliColor($scope.smali.color);
        },
        onColorChange : function(e,color){
            $scope.smali.color = ColorService.convertColor(color,true);
        },
        onHexBlur: function(){
          resetValidations();
          str = $scope.colors.hex;
              if (str != '' && str !== undefined && str !== null) {
                  while (str.length < 3) {str += '0'}
                  if (str.length == 3) str = str.charAt(0) + str.charAt(0) + str.charAt(1) + str.charAt(1) + str.charAt(2) + str.charAt(2);
                  if (str.length < 7) str = 'FF' + str;
                  while (str.length < 8) {
                    str += '0'
                  }
                  str = str.toUpperCase();

                  $scope.colors.hex = str;
                  setUpPreview();

                  if (ColorService.isValidRGBA(str)){
                      var dec = parseInt(str,16);
                      if (dec > 2147483647) {
                        dec -= Math.pow(2,32);
                      }
                      $scope.colors.dec = dec;
                      $scope.colors.smali = (dec < 0 ? '-0x' : '0x') + ColorService.decimalToHex(dec);
                  }
                  else{
                    $scope.validation.wrongHex = true;
                  }
              }else{
                $scope.validation.wrongHex = true;
              }
        },
        onSmaliBlur : function(){
            resetValidations();
            str = $scope.colors.smali;
            if (str != '' && str !== undefined && str !== null) {
                if (!/^-?0x/.test(str)) {
                    str = (str.charAt(0) == '-') ? '-0x' + str.substr(1) : '0x' +str;
                }
                str = str.toUpperCase().replace(/X/,'x');
                $scope.colors.smali = str;
                if (ColorService.isValidSmali(str)) {
                    str = parseInt(str);
                    if (str > 2147483647 || str < -2147483648) {
                        $scope.validation.wrongSmali = true;
                    } else {
                        $scope.colors.dec = str;
                        var hex = str < 0 ? ColorService.decimalToHex(str + Math.pow(2,32)) : ColorService.decimalToHex(str)
                        while (hex.length < 8) {hex = '0' + hex};
                        $scope.colors.hex = hex;
                        setUpPreview();
                    }
                }else $scope.validation.wrongSmali = true;
            }else{
                $scope.validation.wrongSmali = true;
              }
        },
        onXMLBlur : function(){
          resetValidations();
          str = $scope.colors.dec;
              if (str != '' && str !== undefined && str !== null) {
                  if (ColorService.isValidDec(str)) {
                      str = parseInt(str);
                      if (str > 2147483647 || str < -2147483648) {
                         $scope.validation.wrongDec = true;
                      } else {
                          var a = str < 0 ? ColorService.decimalToHex(str + Math.pow(2,32)) : ColorService.decimalToHex(str);
                          while (a.length < 8) {a = '0' + a};
                          $scope.colors.hex = a;
                          setUpPreview();
                          $scope.colors.smali = (str < 0 ? '-0x' : '0x') + ColorService.decimalToHex(str);
                      }
                  }else  $scope.validation.wrongDec = true;
              }
              else{
                $scope.validation.wrongDec = true;
              }
        }
      };

      function setUpPreview(){
        var previewColor = ColorService.calculatePrevColor($scope.colors.hex);
        $scope.colors.preview = previewColor.color;
        $scope.colors.opacity = previewColor.opacity==0?"0": previewColor.opacity*100;
      }

      function resetValidations(){
        $scope.validation ={
            wrongSmali:false,
            wrongHex:false,
            wrongDec: false
        }
      }

    };
