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
    $scope.patient = {
      email: "john.doe@example.com",
      name: "João Silva",
      cpf: "70529428124",
      gender: 2,
      medical_history: "Diabetes tipo II, Alergia a ácaros, animais domésticos.",
      weight:  "75,3"
    };

    $scope.pay = function() {
      console.log("Pagando...");
    };
}]);
