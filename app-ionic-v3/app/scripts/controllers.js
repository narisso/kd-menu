'use strict';
angular.module('Menu.controllers', [])

.controller('LoggedCtrl', function($scope, $state, $ionicActionSheet, $timeout) {
    console.log('logged ctrl');
    if(!localStorage.userId || localStorage.userId === '') {
        $state.go('login')
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
                hideSheet();
            }, 2000);

          };
    }
})
.controller('MainCtrl', function($scope, $state) {
    console.log('main');
    
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
    }
    
});
