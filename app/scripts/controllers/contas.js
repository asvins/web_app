'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ContasCtrl', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {
    $scope.maskCreditCard = function (str) {
      return str.substr(0,4) + '-XXXX-XXXX-' + str.substr(12);
    }

    $scope.update_data = {};

    var user = localStorageService.get("user");

    $scope.subscription = {
      bill: 103.21,
      phone: "",
      credit_card: "",
      address: "",
      delivery_address: ""
    };

    var subsPutParams = function() {
      return {
        email: user.email,
        owner: String(user.id),
        phone: $scope.update_data.phone,
        credit_card: $scope.update_data.credit_card_number,
        address: $scope.update_data.bill_addr.main + ", " + $scope.update_data.bill_addr.number + ", " + $scope.update_data.bill_addr.compl,
        delivery_address: $scope.update_data.del_addr.main + ", " + $scope.update_data.del_addr.number + ", " + $scope.update_data.del_addr.compl
      };
    }

    var fetchAccountData = function() {
      $http({
        method: 'GET',
        params: {email: user.email},
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').subscription + '/api/subscription/show'
      }).then(function successCallback(res) {
        $scope.subscription = res.data;
        localStorageService.set("subscription", $scope.subscription);
      }, function failureCallback(res) {
        console.log("fetchSubscription: Error fetching subscription");
      });
    };
    fetchAccountData();

    var fetchBalance = function() {
      $http({
        method: 'GET',
        params: {eq: "patient_id|" + user.id},
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').operations + '/api/box'
      }).then(function successCallback(res) {
        $scope.box = res.data[0];
        localStorageService.set("box", $scope.subscription);
      }, function failureCallback(res) {
        console.log("fetchBalance: Error fetching boxes");
      });
    };
    fetchBalance();


    $scope.save = function() {
      $http({
        method: 'PUT',
        headers: localStorageService.get('default-headers'),
        params: {email: user.email},
        data: subsPutParams(),
        url: localStorageService.get('urls').subscription + '/api/subscription'
      }).then(function success(res) {
        $scope.subscription = res.data;
        localStorageService.set("subscription", $scope.subscription);
        console.log($scope.subscription);
      }, function failure(res) {
        console.log("save subscription failed!");
      });
    };


    $scope.pay = function() {
      console.log("Pagando..");
      $http({
        method: 'POST',
        data: {email: user.email},
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').subscription + '/api/subscription/pay'
      }).then(function success(res) {
        $scope.subscription.bill = "R$ 0,00";
      }, function failure(res) {
        console.log("save subscription failed!");
      });
    }
}]);
