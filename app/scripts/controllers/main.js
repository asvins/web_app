'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .filter('unsafe', function($sce) { return $sce.trustAsHtml; })
  .controller('MainCtrl', function($scope,$position,$http,localStorageService) {
    $scope.controls = {
      recentMedAdded: "false"
    };
    $scope.user = localStorageService.get('user');

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

    var fetchFeedEvents = function() {
      $http({
        method: 'GET',
        headers: localStorageService.get('default-headers'),
        url: localStorageService.get('urls').core + '/api/patient/' + ($scope.user.ID || $scope.user.id) + '/feed'
      }).then(function successCallback(res) {
        $scope.events = res.data.reverse();
      }, function failureCallback(res) {
        console.log("fetchFeedEvents: Error fetching feed");
      });
    };
    fetchFeedEvents();
  	function Loop () {
  		setTimeout(function () {
        fetchFeedEvents();
				Loop();
			}, 5000);
  	}
    Loop();



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
        name: "Nenhuma medicação disponível",
        active_agent: "--//--",
        br_register: "--//--",
        terapeutic_class: "--//--",
        manufacturer: "--//--",
      }];

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
      } else if (tag == "clock") {
        return ['clock-o', 'info'];
      }
      return ['user', 'info'];
    }
    $scope.events = [
      {
        title: "Bem vindo!",
        tags: "profile",
        desc: "Bem vindo ao Asvins!<br>Aproveite toda comodidade oferecida pelo nosso sistema."
      }
    ];
  });
