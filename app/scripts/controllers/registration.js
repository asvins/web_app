'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('RegistrationCtrl', ['$scope', function($scope) {
    $scope.user = {
      scope: "patient"
    };

    $scope.patient = {
      email: "john.doe@example.com",
      name: "João Silva",
      cpf: "70529428124",
      gender: 2,
      medical_history: "Diabetes tipo II, Alergia a ácaros, animais domésticos.",
      weight:  "75,3"
    };

    $scope.save = function() {
      console.log("ahá");
    };
}]);
