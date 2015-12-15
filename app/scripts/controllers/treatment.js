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
    $scope.controls = {};
    $scope.user = ls.get('user');
    $scope.medications = ls.get('medications');

    var fetchRecipe = function(pr) {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').core + '/api/receipt/' + pr.id
      }).then(function successCallback(res) {
        pr.receipt = res.data[0];
        console.log(res.data);
      }, function failureCallback(res) {
        console.log("fetchRecipe: Error fetching patients");
      });
    };

    var fetchAllPatients = function() {
      $http({
        method: 'GET',
        headers: ls.get('default-headers'),
        url: ls.get('urls').core + '/api/patient'
      }).then(function successCallback(res) {
        $scope.patients = res.data;
      }, function failureCallback(res) {
        console.log("fetchAllPatients: Error fetching patients");
      });
    };
    fetchAllPatients();

    var fetchAllPharmacists = function() {
      $http({
        method: 'GET',
        headers: ls.get('default-headers'),
        url: ls.get('urls').core + '/api/pharmacist'
      }).then(function successCallback(res) {
        $scope.pharmacists = res.data;
      }, function failureCallback(res) {
        console.log("fetchAllPharmacist: Error fetching pharmacist");
      });
    };
    fetchAllPharmacists();

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

    $scope.getMedID = function (pr) {
      pr.medication_id = pr.medication.originalObject.id;
    }

    $scope.getPatID = function (t) {
      t.patient_id = t.patient.originalObject.id;
    }

    $scope.getPhaID = function (t) {
      t.pharmacist_id = t.pharmacist.originalObject.id;
    }

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
            if (pr.receipt.id == 0) { delete pr['receipt']; }
            pr.medication = getMedication(pr);
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

    $scope.openNewTreatment = function () {
      $scope.controls.showExp = true;
      $scope.newTreatment.status = 1;
    }

    $scope.save = function() {
      $scope.newTreatment.finish_date = 0;
      $scope.newTreatment.start_date = Infinity;
      $scope.newTreatment.status = parseInt($scope.newTreatment.status);
      $scope.newTreatment.medic_id = ($scope.user.ID || $scope.user.id);
      $scope.newTreatment.prescriptions.forEach(function(e) {
        e.frequency = parseInt(e.frequency);
        e.starting_at = new Date(e.starting_at).getTime()/1000 + new Date().getHours()*3600 + ((new Date().getMinutes() > 30) ? 3600 : 0);
        if ($scope.newTreatment.start_date > e.starting_at) {
          $scope.newTreatment.start_date = e.starting_at;
        }
        e.finishing_at = new Date(e.finishing_at).getTime()/1000 + new Date().getHours()*3600;
        if ($scope.newTreatment.finish_date < e.finishing_at) {
          $scope.newTreatment.finish_date = e.finishing_at;
        }
      });

      $http({
        method: 'POST',
        headers: ls.get("default-headers"),
        data: $scope.newTreatment,
        url: ls.get("urls").core + '/api/treatments'
      }).then(function successCallback(res) {
        fetchTreatments();
        $scope.controls.showExp = false;
      }, function errorCallback(response) {
        console.log("Error fetching data");
      });
    };
}]);
