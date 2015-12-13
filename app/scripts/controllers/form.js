'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('FormCtrl', ['$scope', 'localStorageService', '$http', function($scope, ls, $http) {
    $scope.user = ls.get("user");

    var merge = function (obj1, obj2) {
      for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname]; };
        if (obj1.ID != undefined) {
          obj1.id = obj1.ID;
        }
      return obj1;
    };

    var fetchUserData = function () {
      $http({
        method: 'GET',
        headers: ls.get("default-headers"),
        data: $scope.user,
        params: {eq: "id|" + ($scope.user.ID || $scope.user.id)},
        url: ls.get("urls").core + '/api/' + $scope.user.scope
      }).then(function successCallback(response) {
        ls.set("user",merge($scope.user, response.data[0]));
        $scope.user = ls.get('user');
        console.log($scope.user);
      }, function errorCallback(response) {
        console.log("Error fetching data");
      });
    }
    fetchUserData();

    $scope.save = function() {
      console.log("SAVING USER");
      $scope.user.gender = parseInt($scope.user.gender);
      $http({
        method: 'PUT',
        headers: ls.get("default-headers"),
        data: $scope.user,
        url: ls.get("urls").core + '/api/' + $scope.user.scope + '/' + $scope.user.id
      }).then(function successCallback(response) {
        console.log('Dados atualizados');
      }, function errorCallback(response) {
        console.log("Error login");
      });
    };
}]);
