'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('Menu', ['ionic', 'Menu.controllers', 'Menu.services'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('logged', {
        url : '/app',
        abstract : true,
        templateUrl: 'templates/logged.html',
        controller: 'LoggedCtrl'
    })
    .state('logged.main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('/app/main');
});
