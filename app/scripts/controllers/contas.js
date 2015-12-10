'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ContasCtrl', ['$scope', function($scope) {
    $scope.balance = {
      bill: "R$103,21",
      phone: "+55(11)97088-4415",
      credit_card_number: "4490-XXXX-XXXX-5625",
      address: "Rua Harmonia, 129, Apartamento 29",
      delivery_address: "Av. Brigadeiro Faria Lima, 775, 5o Andar"
    };

    $scope.update_data = {
    };

    $scope.save = function() {
      console.log($scope.update_data);
    };

    $scope.pay = function() {
      console.log("Pagando..");
    }
}]);
