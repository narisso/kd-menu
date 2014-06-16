'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('Menu', ['ionic', 'Menu.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('/main');
});
