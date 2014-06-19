'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('Menu', ['ionic', 'Menu.controllers', 'Menu.services', 'Menu.filters'])

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
    })
    .state('logged.status', {
        url: '/status',
        templateUrl: 'templates/status.html',
        controller: 'StatusCtrl'
    })
    .state('logged.newOrder', {
        url: '/newOrder/:tableId',
        templateUrl: 'templates/newOrder.html',
        controller: 'NewOrderCtrl'
    })
    .state('logged.reviewOrder', {
        url: '/reviewOrder/:tableId',
        templateUrl: 'templates/reviewOrder.html',
        controller: 'ReviewOrderCtrl'
    })
    .state('logged.productDetail', {
        url: '/product/:productId',
        templateUrl: 'templates/product.html',
        controller: 'ProductDetailCtrl'
    });

    $urlRouterProvider.otherwise('/app/main');
});
