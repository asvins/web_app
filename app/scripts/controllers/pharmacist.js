'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('PharmacistCtrl', ['$scope', function($scope) {
    $scope.selectedPatient = null;
    $scope.patients = [
      {
        email: "john.doe@example.com",
        name: "João Silva",
        cpf: "70529428124",
        gender: 2,
        medical_history: "Diabetes tipo II, Alergia a ácaros, animais domésticos.",
        weight:  "75,3",
        treatments: [
          {
            id: 2,
            title: "Tratamento de pneumonia",
            status: 0
          }
        ]
      },
      {
        email: "john.oliv@example.com",
        name: "João Oliveira",
        cpf: "89229428124",
        gender: 2,
        medical_history: "Gastrite crônica.",
        weight:  "86,7",
        treatments: [
          {
            id: 2,
            title: "Tratamento de Febre",
            status: 0
          }
        ]
      }
    ];


    $scope.save = function() {
      console.log("ahá");
    };
}]);
