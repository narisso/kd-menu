'use strict';
angular.module('Menu.controllers', [])
.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');
  
    $scope.toIntro = function(){
        $state.go('intro');
    }
});
