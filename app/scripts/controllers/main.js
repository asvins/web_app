'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {
    $scope.controls = {
      recentMedAdded: "false"
    };

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
