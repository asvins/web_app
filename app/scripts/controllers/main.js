'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position,$http,localStorageService) {
    $scope.controls = {
      recentMedAdded: "false"
    };

    var fetchAllMedications = function() {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').core + '/api/medications'
      }).then(function successCallback(res) {
        $scope.medications = res.data;
        localStorageService.set("medications", $scope.medications);
      }, function failureCallback(res) {
        console.log("fetchAllMedications: Error fetching medications");
      });
    };
    fetchAllMedications();

    $scope.showDetails = function (med) {
      $scope.curr_med = med;
    };

    $scope.medicationAdded = function (med) {
      setTimeout(function(){
        $scope.$apply(function(){
            $scope.controls.recentMedAdded = 'false';
        })}, 3000);
      $scope.controls.recentMedAdded = 'true';
    };

    $scope.labelToString = function(e) {
      if (e == 0) {
        return "nenhuma";
      } else if (e == 1) {
        return "amarela";
      } else if (e == 2) {
        return "vermelha";
      }
      return "preta";
    };

    $scope.medications = [
      {
        name: "DULOXETINA DR 60MG CÁP.",
        active_agent: "Dipirona",
        br_register: "882794",
        terapeutic_class: "Analgésico",
        manufacturer: "Bayer",
        label: 1,
        type: 1
      },
      {
        name: "SULFATO FERROSO",
        active_agent: "Dipirona",
        br_register: "882794",
        terapeutic_class: "Analgésico",
        manufacturer: "Bayer",
        label: 1,
        type: 1
      },
      {
        name: "TYLENOL DR 200MG TAB",
        active_agent: "Dipirona",
        br_register: "882794",
        terapeutic_class: "Analgésico",
        manufacturer: "Bayer",
        label: 1,
        type: 1
      }
    ];
    $scope.currentDate = new Date();

    $scope.timelinePosition = function (elem) {
      if ($scope.events.indexOf(elem) % 2 == 1) {
        return "timeline-inverted";
      }
      return "";
    }

    $scope.tagToOptions = function (tag) {
      if (tag == 'shipment') {
        return ['truck', 'warning'];
      } else if (tag == 'subscription') {
        return ['credit-card', 'success'];
      } else if (tag == 'profile') {
        return ['user', 'info'];
      }
      return 'success'
    }
    $scope.events = [
      {
        title: "Pedido Entregue",
        tags: "shipment",
        description: "Seu pedido de 10/11/15 até 10/12/15 já está saiu para a entrega!"
      },
      {
        title: "Assinatura Atualizada",
        tags: "subscription",
        description: "Seus dados de pagamento foram atualizados. Isso pode significar que um pagamento foi realizado, ou que um endereço de entrega foi modificado."
      },
      {
        title: "Pedido Enviado",
        tags: "shipment",
        description: "Seu pedido de 10/11/15 até 10/12/15 já foi enviado pela transportadora!"
      },
      {
        title: "Dados Atualizados",
        tags: "profile",
        description: "Os dados de sua conta foram atualizados com sucesso!"
      },
      {
        title: "Pedido Agendado",
        tags: "shipment",
        description: "Seu pedido de 10/11/15 até 10/12/15 já foi agendado."
      }
    ];
  });
