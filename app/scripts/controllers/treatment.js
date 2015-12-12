'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('TreatmentCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.selectedTreatment = null

    var treatmentFinderForPatient = function (patient) {
      return function (treatment, index, arr) {
        if (treatment.id == patient.treatment_id) {
          return treatment;
        }
      }
    }


    $scope.showDetails = function (patient) {
      $scope.selectedTreatment = $scope.treatments.find(treatmentFinderForPatient(patient ));
    };
    $scope.controls = {};
    $scope.newTreatment = {};
    $scope.controls.showExp = false;

    $scope.addNewTPr = function () {
      if ($scope.newTreatment.prescriptions == undefined) {
        $scope.newTreatment.prescriptions = [{}];
      } else {
        $scope.newTreatment.prescriptions.push({})
      }
    }

    $scope.patients = [
      {
        name: "João Silva",
        id:1,
        treatment_id: 1
      },
      {
        name: "Rafael Leite",
        id:2,
        treatment_id: 2
      }
    ];

    $scope.treatments = [
      {
        id: 1,
        title: "Tratamento de varíola",
        patient_id: 2,
        pharmacist_id: 1,
        status: 0,
        comments: "Paciente tem se recuperado aos poucos da complicação, porém com sintomas ainda existentes.",
        prescriptions: [
          {
            medication: "DIPIRONA 60MG CÁP.",
            starting_at: "15/10/2015",
            finishing_at: "30/10/2015",
            frequency: 3,
            medication_id: 2
          },
          {
            medication: "NEOCESOL 1%.",
            starting_at: "18/11/2015",
            finishing_at: "21/11/2015",
            frequency: 1,
            medication_id: 2
          }
        ],
        receipts: [
          {
            file_path: "/recept/1",
            status: 0
          }
        ]
      },
      {
        id: 2,
        title: "Tratamento de pneumonia",
        patient_id: 2,
        pharmacist_id: 1,
        status: 0,
        comments: "Paciente em estado grave. Ficar em observação.",
        prescriptions: [
          {
            medication: "DIPIRONA 60MG CÁP.",
            starting_at: "15/10/2015",
            finishing_at: "30/10/2015",
            frequency: 3,
            medication_id: 2
          },
          {
            medication: "NEOCESOL 1%.",
            starting_at: "18/11/2015",
            finishing_at: "21/11/2015",
            frequency: 1,
            medication_id: 2
          }
        ],
        receipts: [
          {
            file_path: "/recept/1",
            status: 0
          }
        ]
      }
    ];

    $scope.newTreatment = function () {
      $scope.controls.showExp = true;
    }

    $scope.save = function() {
      console.log("ahá");
    };
}]);
