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
      }, function errorCallback(response) {
        console.log("Error fetching data");
      });
    }
    fetchUserData();

    $scope.mEnumToString = function(e) {
      switch (e) {
        case 0:
          return "Endocrinologista";
        case 1:
          return "Gastroenterologista";
        case 2:
          return "Ginecologista";
        case 3:
          return "Clínico Geral";
        case 4:
          return "Dermatologista";
      }
    }

  $scope.pEnumToString = function(e) {
    switch (e) {
      case 0:
        return "Administração Hospitalar";
      case 1:
        return "Administração Farmacêutica";
      case 2:
        return "Administração de Laboratório Clínico";
      case 3:
        return "Biofarmacêutico";
      case 4:
        return "Análises Clínicas";
    }
  }

    $scope.save = function() {
      $scope.user.specialty = parseInt($scope.user.specialty);
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
