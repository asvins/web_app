'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('FormCtrl', ['$scope', '$rootScope', function($scope, root) {
    $scope.user = root.user;
    $scope.patient = {};
    $scope.pharmacist = {};
    $scope.medic = {};

    $scope.save = function() {
      console.log("ahá");
    };
}]);
