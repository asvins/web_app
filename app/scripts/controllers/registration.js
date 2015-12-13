'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('RegistrationCtrl', ['$scope','$state','localStorageService', '$http', function($scope,state,ls,$http) {
    $scope.user = {
      scope: "patient"
    };

    var merge = function (obj1, obj2) {
      for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
      return obj1
    };

    var redirectUser = function(user) {
      // fetchAllMedications();
      if (user.scope == "patient") {
        state.go('dashboard.home');
      } else if (user.scope == "medic") {
        state.go('dashboard.treatment');
      } else if (user.scope == "pharmacist") {
        state.go('dashboard.pharmacist');
      }
    };

    var fetchAllMedications = function() {
      $http({
        method: 'GET',
        headers: ls.get('default-headers'),
        url: ls.get('urls').core + 'api/medications'
      }).then(function success(res) {
        ls.set("medications", res.data);
      }, function failure(res) {
        console.log("fetchAllMedications: Error fetching medications");
      });
    };

    //vish
    var adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0NDMyNzQyODUsImlzcyI6Ind3dy5hc3ZpbnMuY29tLmJyIiwic2NvcGUiOiJhZG1pbiIsInN1YiI6InZpbmljaXVzQGFzdmlucy5jb20uYnIifQ.LeovKEWm806y-t0oWTYV9QVmynahlRM50Hw3Bcg-MHI';

    $scope.save = function() {
      $http({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminToken
        },
        data: $scope.user,
        url: ls.get("urls").auth + '/api/registration'
      }).then(function successCallback(response) {
        ls.set("user", merge($scope.user,response.data));
        redirectUser($scope.user);
      }, function errorCallback(response) {
        console.log("Error registration");
      });
    };
}]);
