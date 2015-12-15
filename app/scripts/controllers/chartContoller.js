'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout','localStorageService','$http','Upload', function ($scope, $timeout, localStorageService, $http, Upload) {
    $scope.selected_med = null;
    $scope.user = localStorageService.get('user');
    $scope.medications = localStorageService.get('medications');
    $scope.select = function (p) {
      $scope.selected_pre = p;
    };

    $scope.file = null;

    $scope.medicationString = function(e) {
      switch (e) {
        case 0:
          return "Líquido";
        case 1:
          return "Pílulas";
        case 2:
          return "Pomada";
      }
    }

    var fetchRecipe = function(pr) {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').core + '/api/receipt/' + pr.id
      }).then(function successCallback(res) {
        pr.receipt = res.data[0];
      }, function failureCallback(res) {
        console.log("fetchRecipe: Error fetching patients");
      });
    };

    $scope.receiptURL = function(pr) {
      if (!pr || !pr.receipt) {
        return "/404.html"
      }
      return localStorageService.get('urls').core + '/api/receipt/' + pr.id + '?receipt_id=' + pr.receipt.id;
    };

    $scope.xEnumToString = function (e) {
      switch (e) {
        case 0:
          return "De 4 em 4 horas";
        case 1:
          return "De 6 em 6 horas";
        case 2:
          return "De 8 em 8 horas";
        case 3:
          return "De 12 em 12 horas";
        case 4:
          return "De 24 em 24 horas";
      }
    }

    var fetchMyTreatment = function() {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        params: {eq: "patient_id|" + ($scope.user.ID || $scope.user.id)},
        url: localStorageService.get('urls').core + '/api/treatments'
      }).then(function successCallback(res) {
        $scope.treatment = res.data[0];
        $scope.treatment.prescriptions.forEach(function (p) {
          if (p.receipt.ID == 0) { delete p['receipt']; }
          fetchRecipe(p);
          p.medication = $scope.medications.find(function(elem) {
            if (p.medication_id == elem.id) {
              return elem;
            }
          });
        });
      }, function failureCallback(res) {
        console.log("fetchMyTreatment: Error fetching medications");
      });
    };
    fetchMyTreatment();

    $scope.upload = function(prId) {
        Upload.upload({
            url: localStorageService.get('urls').core + '/api/receipt/' + prId,
            data: {receipt: $scope.file}
        }).then(function (resp) {
            $scope.file = null;
            fetchMyTreatment();
        });
      };
    }]);
