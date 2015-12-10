'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.selected_med = null;

    $scope.select = function (med) {
      $scope.selected_med = med
    };

    $scope.toggleSend = function () {
      if ($scope.selected_med.will_send == "true") {
        $scope.selected_med.will_send = "false";
      } else {
        $scope.selected_med.will_send = "true";
      }
    }

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
    $scope.extras = [
     {
       id: 4,
       type: "cápsula",
       need_prescription: "false",
       name: "FLORATIL 50mg CAP",
       shipment_date: "24/09",
       will_send: "true",
       dosage: "1 - 8:30, 2 - 16:30",
       bula: "http://www.sanofi.com.br/produtos/notice_aas.pdf",
       supervisor: "João Silva",
       register: "099742883"
     },
     {
       id: 5,
       type: "cápsula",
       need_prescription: "false",
       name: "FENOFIBRATO 250mg CAP",
       shipment_date: "24/09",
       will_send: "true",
       dosage: "1 - 8:30, 2 - 16:30",
       bula: "http://www.sanofi.com.br/produtos/notice_aas.pdf",
       supervisor: "João Silva",
       register: "099742883"
     },
     {
       id: 6,
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
