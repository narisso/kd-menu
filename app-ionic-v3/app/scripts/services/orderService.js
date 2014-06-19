'use strict';
angular.module('Menu.services')

/**
 * A simple example service that returns some data.
 */

.factory('OrderService', function($http) {
    var url = 'http://prod-kd-menu.herokuapp.com/api/order';
    
    function _create(userId, tableId) {
        return $http.put(url, {
            waiterId : userId,
            tableId : tableId,
            status : 'waiting'
        });
    }
    
    return {
        create : _create
    }
});