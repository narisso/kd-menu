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
.controller('StatusCtrl', function($scope, $state, TableService, OrderService, $ionicLoading, $ionicPopup) {
    console.log('status');
    $scope.tables = TableService.all();
    $scope.newOrder = function(tableId) {
        console.log(tableId);
        $ionicLoading.show({ template : '<i class="icon ion-looping loading-icon"></i>' });
        
        OrderService.create(localStorage.userId, tableId)
        .success(function(data) {
            TableService.get(tableId).orderId = data.data._id;
            $ionicLoading.hide();
            $state.go('logged.newOrder', { tableId : tableId });
        })
        .error(function() {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title : 'Error',
                subTitle : 'Ha ocurrido un error en la comunicación',
                okText : 'Cerrar'
            });
        });
    };
    
})
.controller('NewOrderCtrl', function($scope, $state, $stateParams, TableService, $ionicNavBarDelegate, $log) {
    console.log('new order');
    $scope.log = $log.log;
    $scope.table = TableService.createOrder($stateParams.tableId);
    
    $scope.blockScreen= function() {
        console.log('block');
        $ionicNavBarDelegate.showBar(false);
    };
    
    $scope.unblockScreen = function() {
        console.log('unblock');
        $ionicNavBarDelegate.showBar(true);
    };
    
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
        $state.go('logged.reviewOrder', { tableId : $scope.table.id } );
    };
    
    $scope.productDetails = function(productId) {
        $state.go('logged.productDetail', { productId : productId });
    };
})
.controller('ReviewOrderCtrl', function($scope, $state, $stateParams, TableService, OrderService, $ionicLoading, $q) {
    console.log('review order');
    $scope.table = TableService.get($stateParams.tableId);
    
    $scope.editOrder = function() {
        $state.go('logged.newOrder', { tableId : $scope.table.id } );
    };
    
    $scope.confirmOrder = function() {
        $ionicLoading.show({ template : '<i class="icon ion-looping loading-icon"></i>' });
        
        var requests = [];
        for(var i = $scope.table.order.length - 1; i >= 0; i--) {
            if($scope.table.order[i].order) {
                requests.push(OrderService.addItem($scope.table.orderId, $scope.table.order[i]));
            }
        }
        
        $q.all(requests).then(function() {
            $ionicLoading.hide();
            $state.go('logged.status');
        });
    };
    
})
.controller('ProductDetailCtrl', function($scope, $state, $stateParams,ProductService) {
    console.log('product detail');
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
