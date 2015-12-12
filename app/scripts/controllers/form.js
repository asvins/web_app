'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('FormCtrl', ['$scope', 'localStorageService', function($scope, ls) {
    $scope.user = ls.get("user");
    $scope.patient = {};
    $scope.pharmacist = {};
    $scope.medic = {};

    $scope.save = function() {
      $http({
        method: 'POST',
        headers: ls.get("default-headers"),
        data: $scope.user,
        url: ls.get("urls").core + '/api/'
      }).then(function successCallback(response) {

      }, function errorCallback(response) {
        console.log("Error login");
        ls.remove("user");
      });
    };
}]);
