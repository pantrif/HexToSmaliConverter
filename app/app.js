/**
 * @project Hex To Smali
 * @version 1.0
 * @licence MIT
 * @author Leonidas Maroulis
 */
(function() {
  
  var app = angular.module('HexToSmaliApp', ['ngRoute', 'ngAnimate']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        controller:  'MainController',
        templateUrl: 'app/views/main.html'
      })
      .otherwise({ redirectTo: '/' });
  }]);

    
}());
