'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout','localStorageService','$http', function ($scope, $timeout, localStorageService, $http) {
    $scope.selected_med = null;
    $scope.user = localStorageService.get('user');
    $scope.medications = localStorageService.get('medications');
    $scope.select = function (med) {
      $scope.selected_med = med
    };

    var fetchMyTreatment = function() {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        params: {eq: "patient_id|" + ($scope.user.ID || $scope.user.id)},
        url: localStorageService.get('urls').core + '/api/treatments'
      }).then(function successCallback(res) {
        $scope.treatment = res.data[0];
        $scope.treatment.prescriptions.forEach(function (p) {
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


    $scope.medications = [
     {
       id: 1,
       type: "pomada",
       need_prescription: "true",
       name: "DULOXETINA DR 60mg CAP",
       shipment_date: "24/09",
       receipt_uploaded: "true",
       will_send: "true",
       dosage: "1 - 8:30, 2 - 16:30",
       bula: "http://www.sanofi.com.br/produtos/notice_aas.pdf",
       supervisor: "João Silva",
       register: "099742883"
     },
     {
       id: 2,
       type: "cápsula",
       need_prescription: "true",
       receipt_uploaded: "false",
       name: "FENOFIBRATO 250mg CAP",
       shipment_date: "24/09",
       will_send: "true",
       dosage: "1 - 8:30, 2 - 16:30",
       bula: "http://www.sanofi.com.br/produtos/notice_aas.pdf",
       supervisor: "João Silva",
       register: "099742883"
     },
     {
       id: 3,
       type: "tablete",
       need_prescription: "false",
       name: "LISINOPRIL 10mg TAB",
       shipment_date: "24/09",
       will_send: "true",
       dosage: "1 - 8:30, 2 - 16:30",
       bula: "http://www.sanofi.com.br/produtos/notice_aas.pdf",
       supervisor: "João Silva",
       register: "099742883"
     }
    ];
    }]);
