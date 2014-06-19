'use strict';
angular.module('Menu.services')

.factory('ScanService', function () {

    return {
        scan: function(success, fail) {
            if(typeof cordova === 'undefined'){
                fail('Cordova not available'); 
                return; 
            }
            cordova.plugins.barcodeScanner.scan(
                function (result) { success(result); },
                function (error) { fail(error); }
            );
        }
    };

});