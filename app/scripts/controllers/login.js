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
        notification: "http://192.168.0.32:8002",
        warehouse: "http://192.168.0.32:8003",
        subscription: "http://192.168.0.32:8004",
        operations: "http://192.168.0.32:8005",
        core: "http://192.168.0.32:8006"
      }
    );
    ls.set("default-headers", {'Content-Type': "application/json"});
    $scope.user = {
      email: "",
      password: ""
    };

    var redirectUser = function(user) {
      if (user.scope == "patient") {
        state.go('dashboard.home');
      } else if (user.scope == "medic") {
        state.go('dashboard.treatment');
      } else if (user.scope == "pharmacist") {
        state.go('dashboard.pharmacist');
      }
    }

    if (ls.get('user') && ls.get('user').scope) {
      console.log(ls.get('user'));
      redirectUser(ls.get('user'));
    }

    $scope.login = function() {
      $http({
        method: 'POST',
        headers: ls.get("default-headers"),
        data: $scope.user,
        url: ls.get("urls").auth + '/api/login'
      }).then(function successCallback(response) {
        var user = {};
        user = jwt.decodeToken(response.data.access_token);
        user.email = user.sub;
        ls.set("user", user);
        var headers;
        headers = ls.get("default-headers");
        headers['Authorization'] = user.token;
        ls.set("default-headers", headers);
        redirectUser(user);
      }, function errorCallback(response) {
        console.log("Error login");
        ls.remove("user");
      });
    };
}]);
