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
    
    function _addItem(orderId, product) {
        return $http.put(url + '/item', {
            orderId : orderId,
            code : product.id,
            name : product.name,
            price : product.price,
            comment : product.comment,
            status : 'waiting'
        });
    }
    
    return {
        create : _create,
        addItem : _addItem
    };
});