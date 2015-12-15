'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('PharmacistCtrl', ['$scope', '$http','localStorageService', function($scope, $http,localStorageService) {
    $scope.selectedTreatment = null;
    $scope.user = localStorageService.get('user');
    $scope.medications = localStorageService.get('medications');

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

    $scope.receiptURL = function (prId, recId) {
      return localStorageService.get('urls').core + '/api/receipt/' + prId + '?receipt_id=' + recId;
    }

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

    var fetchMyTreatments = function() {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        params: {eq: "pharmacist_id|" + $scope.user.id},
        url: localStorageService.get('urls').core + '/api/treatments'
      }).then(function successCallback(res) {
        $scope.treatments = res.data;
        $scope.treatments.forEach(function (t) {
          t.prescriptions.forEach(function (p) {
            if (p.receipt.id == 0) { delete p['receipt']; }
            fetchRecipe(p);
            p.medication = $scope.medications.find(function(elem) {
              if (p.medication_id == elem.id) {
                return elem;
              }
            });
          });
        });
      }, function failureCallback(res) {
        console.log("fetchMyTreatments: Error fetching treatments");
      });
    };
    fetchMyTreatments();

    $scope.showDetails = function (t) {
      $scope.selectedTreatment = t;
    };

    $scope.approve = function (t) {
      $http({
        method: 'POST',
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').core + '/api/treatments/' + t.id + '/validate'
      }).then(function successCallback(res) {
        fetchMyTreatments();
      }, function failureCallback(res) {
        console.log("fetchMyTreatments: Error fetching treatments");
      });
    }
}]);
