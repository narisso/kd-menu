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
    
    $scope.checkTable = function(table){
        console.log('checkTable ' + table.id);
        if(table.order){
            $state.go('logged.orderStatus', { tableId: table.id });
        }
        else{
            $scope.newOrder(table.id);
        }
    };
})
.controller('OrderStatusCtrl', function($scope, $state, $stateParams, TableService, $log, ScanService, $ionicPopup, $ionicModal){
    $log.log('order status');
    //$scope.table = TableService.get($stateParams.tableId);
    $scope.table = {'id':1,'order':[{'id':1,'cat':'Aperitivo','name':'Empanadas surtidas','desc':'Deliciosas empanadas de camarón, queso y aceituna para disfrutar de a 3 personas.','price':'7990','img':['emapandas.jpg','empanadas2.png'],'$$hashKey':'00A','order':true,'qty':3,'comment':'Comment'},{'id':2,'cat':'Plato Principal','name':'Filete a lo pobre','desc':'Jugoso filete acompañado de papas fritas, cebolla y huevo.','price':'11990','img':['bistec.jpg','bistec.jpg','filete2.jpg'],'$$hashKey':'00B','order':true,'qty':2,'comment':''},{'id':3,'cat':'Plato Principal','name':'Tallarines a la Bolognesa','desc':'La más exquisita pasta fresca servida con salsa de tomates y carne.','price':'6990','img':['tallarines.jpg'],'$$hashKey':'00C','order':false,'qty':1,'comment':''},{'id':4,'cat':'Postre','name':'Helado Artesanal','desc':'3 bolitas de helado artesanal. Sabores disponibles: Frambuesa, frutilla, vainilla y piña.','price':'2990','img':['helado.jpg'],'$$hashKey':'00D','order':false,'qty':1,'comment':''},{'id':5,'cat':'Bebidas','name':'Coca-Cola','desc':'','price':'1200','img':['cocacola.jpg'],'$$hashKey':'00E','order':false,'qty':1,'comment':''},{'id':6,'cat':'Bebidas','name':'Coca-Cola Light','desc':'Brownie relleno con chocolate fundido','price':'4590','img':['cocacolalight.png'],'$$hashKey':'00F','order':false,'qty':1,'comment':''},{'id':7,'cat':'Bebidas','name':'Jugo de Frambuesa','desc':'Jugo natural','price':'1900','img':['frambuesa.jpg'],'$$hashKey':'00G','order':false,'qty':1,'comment':''},{'id':8,'cat':'Cervezas','name':'Cristal 300cc','desc':'','price':'1500','img':['cristal.jpg'],'$$hashKey':'00H','order':false,'qty':1,'comment':''},{'id':9,'cat':'Cervezas','name':'Cristal 500cc','desc':'','price':'1990','img':['cristal.jpg'],'$$hashKey':'00I','order':false,'qty':1,'comment':''},{'id':10,'cat':'Cervezas','name':'Austral Calafate','desc':'','price':'2600','img':['austral.jpg'],'$$hashKey':'00J','order':false,'qty':1,'comment':''},{'id':11,'cat':'Cervezas','name':'Schop Kunstmann Torobayo','desc':'','price':'2800','img':['kunstmann.jpg'],'$$hashKey':'00K','order':false,'qty':1,'comment':''}],'orderId':null};

    $scope.getTotal = function(){
        var total = 0;
        $scope.table.order.forEach(function(product){
            total += product.qty * product.price;
        });
        return total;
    };


    $scope.goBack = function(){
        $state.go('logged.status');
    }

    $scope.scanClick = function() {
        ScanService.scan(
        function(result) {
            if (result.cancelled) {
                $ionicModal.fromTemplate('').show().then(function() {
                    $ionicPopup.alert({
                        title: 'QR Scan Cancelled',
                        template: 'You cancelled it!'
                    });
                });
            }
            else {
                $ionicPopup.alert({
                    template: 'Result: ' + result.text
                });
            }
        },
        function(error) {
            $ionicPopup.alert({
                    title: 'Unable to scan the QR code',
                    template: 'Too bad, something went wrong.'
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
        p.order = p.order ? p.order : false;
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

    $scope.getTotal = function(){
        var total = 0;
        $scope.table.order.forEach(function(product){
            if(product.order)
            {
                total += product.qty * product.price;
            }
        });
        return total;
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
