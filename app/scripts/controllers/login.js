'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'jwtHelper', '$state', function($scope, $rootScope, jwt, state) {
    $scope.user = {
      scope: "patient",
      email: "",
      password: ""
    };

    var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsImF1ZCI6IkJVSUpTVzl4NjBzSUhCdzhLZDlFbUNiajhlRElGeERDIiwic2NvcGUiOiJwYXRpZW50IiwiaWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImV4cCI6MTQxMjIzNDczMCwiaWF0IjoxNDEyMTk4NzMwfQ.zmp6GJ34XdIWGfDD_zvsIpGEVbWuy927iPadHs-RdiQ';

    $scope.login = function() {
      $rootScope.user = jwt.decodeToken(expToken);
      if ($rootScope.user.scope == "patient") {
        state.go('dashboard.home');
      } else if ($rootScope.user.scope = "medic") {
        //send email
      }
    };
}]);
