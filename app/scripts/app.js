'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'angular-jwt',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'LocalStorageModule',
    'angucomplete-ie8',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','localStorageServiceProvider', '$httpProvider', '$sceDelegateProvider', function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,localStorageService, $httpProvider, $sceDelegateProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        controller: 'FormCtrl',
        url:'/dados',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/form.js']
            })
          }
        }
    })
      .state('registration',{
        templateUrl:'views/pages/registration.html',
        controller:'RegistrationCtrl',
        url:'/registration',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return  $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/registration.js']
            })
          }
        }
    })
      .state('dashboard.treatment',{
        templateUrl:'views/pages/treatment.html',
        controller:'TreatmentCtrl',
        url:'/treatment',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return  $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/treatment.js']
            })
          }
        }
    })
      .state('dashboard.pharmacist', {
        templateUrl:'views/pages/pharmacist.html',
        controller:'PharmacistCtrl',
        url:'/pharmacist',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return  $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/pharmacist.js']
            })
          }
        }
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        controller:'LoginCtrl',
        url:'/login',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return  $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/login.js']
            })
          }
        }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/medicamentos',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        controller: 'ContasCtrl',
        url:'/contas',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return  $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/contas.js']
            })
          }
        }
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);
