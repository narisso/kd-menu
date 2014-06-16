'use strict';
angular.module('Menu.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('NewOrderCtrl', function($scope) {
})

.controller('NewOrderTakeCtrl', function($scope, Products) {
    $scope.products = Products.all();
    $scope.currentCat = '';
    $scope.CreateHeader = function(cat) {
        var show = cat != $scope.currentCat;
        $scope.currentCat = cat;
        return show;
    };
})

.controller('ConfirmOrderCtrl', function($scope) {
})

.controller('CocinaCtrl', function($scope) {
})

.controller('MenuCtrl', function($scope, Products) {
    $scope.products = Products.all();
    $scope.currentCat = '';
    $scope.CreateHeader = function(cat) {
        var show = cat != $scope.currentCat;
        $scope.currentCat = cat;
        return show;
    };
    
})

.controller('MenuItemCtrl', function($scope, $stateParams, Products) {
    $scope.item = Products.get($stateParams.id);
})

.controller('TablesCtrl', function($scope, Tables) {
  $scope.tables = Tables.all();
})

.controller('TableDetailCtrl', function($scope, $stateParams, Tables) {
  $scope.table = Tables.get($stateParams.id);
})

.controller('PayTableDetailCtrl', function($scope, $stateParams, Tables) {
  $scope.table = Tables.get($stateParams.id);
})

;
