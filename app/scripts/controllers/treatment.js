'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('TreatmentCtrl', ['$scope', function($scope) {
    $scope.selectedTreatment = null
    $scope.user = {
      scope: "medic"
    };

    var treatmentFinderForPatient = function (patient) {
      return function (treatment, index, arr) {
        if (treatment.id == patient.treatment_id) {
          return treatment;
        }
      }
    }


    $scope.showDetails = function (patient) {
      $scope.selectedTreatment = $scope.treatments.find(treatmentFinderForPatient(patient));
    };


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
        prescriptions: [
          {
            starting_at: "15/10/2015",
            finishing_at: "30/10/2015",
            frequency: 0,
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

    $scope.save = function() {
      console.log("ahá");
    };
}]);
