'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'jwtHelper', '$state','localStorageService', '$http', function($scope, $rootScope, jwt, state, ls, $http) {
    ls.set("urls",
      {
        auth: "http://192.168.0.32:8001",
        core: "http://192.168.0.32:8006",
      }
    );
    ls.set("default-headers", {'Content-Type': "application/json"});
    $scope.user = {
      email: "",
      password: ""
    };

    $scope.login = function() {
      console.log($scope.user)
      $http({
        method: 'POST',
        headers: ls.get("default-headers"),
        data: $scope.user,
        url: ls.get("urls").auth + '/api/login'
      }).then(function successCallback(response) {
        var user;
        user = jwt.decodeToken(response.data.access_token);
        user.token = response.data.access_token;
        ls.set("user", user);
        var headers;
        headers = ls.get("default-headers");
        headers['Authorization'] = user.token;
        ls.set("default-headers", headers);
        if (user.scope == "patient") {
          state.go('dashboard.home');
        } else if (user.scope == "medic") {
          state.go('dashboard.treatment');
        } else if (user.scope == "pharmacist") {
          state.go('dashboard.pharmacist');
        }
      }, function errorCallback(response) {
        console.log("Error login");
        ls.remove("user");
      });
    };
}]);
