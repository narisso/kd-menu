'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Menu', ['ionic', 'Menu.controllers', 'Menu.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //StatusBar.styleDefault();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    
    .state('tab.cocina', {
      url: '/cocina',
      views: {
        'tab-cocina': {
          templateUrl: 'templates/tab-cocina.html',
          controller: 'CocinaCtrl'
        }
      }
    })
    
    .state('tab.menu', {
      url: '/menu',
      views: {
        'tab-menu': {
          templateUrl: 'templates/tab-menu.html',
          controller: 'MenuCtrl'
        }
      }
    })
    
    .state('tab.menu-item', {
      url: '/menu/item/:id',
      views: {
        'tab-menu': {
          templateUrl: 'templates/tab-menu-item.html',
          controller: 'MenuItemCtrl'
        }
      }
    })
    
    //Nueva orden:
    //Elegir mesero y mesa, pedido manual o auto atencion
    
    .state('tab.newOrder', {
      url: '/newOrder',
      views: {
        'tab-newOrder': {
          templateUrl: 'templates/tab-newOrder.html',
          controller: 'NewOrderCtrl'
        }
      }
    })
    
    .state('tab.newOrder-take', {
      url: '/newOrder/take',
      views: {
        'tab-newOrder': {
          templateUrl: 'templates/tab-newOrderTake.html',
          controller: 'NewOrderTakeCtrl'
        }
      }
    })
    
    .state('tab.confirmOrder', {
      url: '/newOrder/confirm',
      views: {
        'tab-newOrder': {
          templateUrl: 'templates/tab-confirmOrder.html',
          controller: 'ConfirmOrderCtrl'
        }
      }
    })
    
    .state('tab.tables', {
      url: '/tables',
      views: {
        'tab-tables': {
          templateUrl: 'templates/tab-tables.html',
          controller: 'TablesCtrl'
        }
      }
    })
    
    .state('tab.tableDetail', {
      url: '/tables/:id',
      views: {
        'tab-tables': {
          templateUrl: 'templates/tab-tableDetail.html',
          controller: 'TableDetailCtrl'
        }
      }
    })
    
    .state('tab.payTableDetail', {
      url: '/tables/pay/:id',
      views: {
        'tab-tables': {
          templateUrl: 'templates/tab-qr.html',
          controller: 'PayTableDetailCtrl'
        }
      }
    })
    
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

