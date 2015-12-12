'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('RegistrationCtrl', ['$scope','$state','$rootScope', function($scope,$state,$rootScope) {
    $scope.user = {
      scope: "patient"
    };
    $scope.medic = {};
    $scope.pharmacist = {};

    $scope.patient = {
      email: "john.doe@example.com",
      name: "João Silva",
      cpf: "70529428124",
      gender: 2,
      medical_history: "Diabetes tipo II, Alergia a ácaros, animais domésticos.",
      weight:  "75,3"
    };

    $scope.save = function() {
      console.log($scope.medic);
      $rootScope.user = $scope[$scope.user.scope];
      $rootScope.user.scope = $scope.user.scope;
      if ($scope.user.scope == "patient") {
        //call endpoint
        $state.go('dashboard.home');
      } else {
        //send email
        $state.go('dashboard.pharmacist');
      }
    };
}]);
