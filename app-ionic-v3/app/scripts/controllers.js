'use strict';
angular.module('Menu.controllers', [])

.controller('LoggedCtrl', function($scope, $state, $ionicActionSheet, $timeout) {
    console.log('logged ctrl');
    if(!localStorage.userId || localStorage.userId === '') {
        $state.go('login');
    }
    else {
        $scope.userId = localStorage.userId;
        $scope.showOptions = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [],
                destructiveText : 'Cerrar Sesión',
                titleText: 'Opciones',
                cancelText: 'Cancel',
                destructiveButtonClicked : function() {
                    $state.go('login');
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                if(hideSheet && typeof hideSheet === 'function') {
                    hideSheet();
                }
            }, 2000);

        };
    }
})
.controller('MainCtrl', function() {
    console.log('main');
})
.controller('StatusCtrl', function($scope, $state, TableService) {
    console.log('status');
    $scope.tables = TableService.all();
    $scope.newOrder = function(tableId) {
        console.log(tableId);
        $state.go('logged.newOrder', { tableId : tableId });
    };
    
})
.controller('NewOrderCtrl', function($scope, $state, $stateParams, TableService, $log) {
    console.log('new order');
    $scope.table = TableService.createOrder($stateParams.tableId);
    $log.log($scope.table);
    $scope.blockScreen= function() {
        console.log('block');
    };
    
    $scope.log = $log;
    
    $scope.CreateHeader = function(cat) {
        var show = cat !== $scope.currentCat;
        $scope.currentCat = cat;
        return show;
    };
    
    $scope.initProduct = function(p) {
        p.order= p.order ? p.order : false;
        p.qty = p.qty ? p.qty : 1;
        p.comment = p.comment ? p.comment : '';
    };
    
    $scope.cancelOrder = function() {
        $scope.table.order = false;
        var a = TableService.removeOrder($scope.table.id);
        $log.log(a);
        $state.go('logged.status');
    };
    
    $scope.placeOrder = function() {
        $state.go('logged.status');
    };
    
    $scope.productDetails = function(productId) {
        $state.go('logged.productDetail', { productId : productId });
    };
})
.controller('ProductDetailCtrl', function($scope, $state, $stateParams,ProductService) {
    console.log('product detail');
    console.log($stateParams);
    $scope.p = ProductService.get($stateParams.productId);
    
})
.controller('LoginCtrl', function($scope, $state) {
    console.log('login');
    
    delete localStorage.userId;
    $scope.userId = '';
    $scope.loginClick = function() {
        if(this.userId !== '') {
            localStorage.userId = this.userId;
            $state.go('logged.main');
        }
    };
    
});
