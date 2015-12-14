'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('TreatmentCtrl', ['$scope', '$rootScope', '$http', 'localStorageService', function($scope, $rootScope, $http, ls) {
    $scope.selectedTreatment = null;
    $scope.user = ls.get('user');

    var fetchUserData = function (treat, uid, scope) {
      $http({
        method: 'GET',
        headers: ls.get("default-headers"),
        data: $scope.user,
        params: {eq: "id|" + uid},
        url: ls.get("urls").core + '/api/' + scope
      }).then(function successCallback(response) {
        treat[scope] = response.data[0];
      }, function errorCallback(response) {
        console.log("Error fetching data");
      });
    };

    $scope.receiptURL = function (prId, recId) {
      return ls.get('urls').core + '/api/receipt/' + prId + '?receipt_id=' + recId;
    }

    var getMedication = function (pr) {
      var meds = ls.get('medications');
      return meds.find(function(elem, index, arr){
        if (elem.id == pr.medication_id) {
          return elem;
        }
      });
    };

    var fetchTreatments = function () {
      $http({
        method: 'GET',
        headers: ls.get("default-headers"),
        data: $scope.user,
        params: {eq: "medic_id|" + ($scope.user.ID || $scope.user.id)},
        url: ls.get("urls").core + '/api/treatments'
      }).then(function successCallback(response) {
        $scope.treatments = response.data;
        $scope.treatments.forEach(function (t) {
          fetchUserData(t, t.patient_id, "patient");
          fetchUserData(t, t.pharmacist_id, "pharmacist");
          t.prescriptions.forEach(function (pr) {
            p.medication = getMedication(pr);
            if (p.receipt.ID == 0) { delete p['receipt'] }
          });
        });
      }, function errorCallback(response) {
        console.log("Error fetching data");
      });
    }
    fetchTreatments();


    $scope.showDetails = function (t) {
      $scope.selectedTreatment = t;
    };

    $scope.controls = {};
    $scope.newTreatment = {};
    $scope.controls.showExp = false;

    $scope.addNewTPr = function () {
      if ($scope.newTreatment.prescriptions == undefined) {
        $scope.newTreatment.prescriptions = [{}];
      } else {
        $scope.newTreatment.prescriptions.push({});
      }
    }

    $scope.newTreatment = function () {
      $scope.controls.showExp = true;
    }

    $scope.save = function() {
      console.log("ahá");
    };
}]);
