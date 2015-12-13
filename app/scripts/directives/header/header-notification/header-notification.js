'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
				scope: {},
				controller: function ($scope, localStorageService, $state) {
					$scope.logout = function() {
						localStorageService.remove("user");
						localStorageService.set("default-headers", {'Content-Type': "application/json"});
						$state.go('login');
					}
				}
    	}
	});
