'use strict';
angular.module('Menu.services')

/**
 * A simple example service that returns some data.
 */

.factory('TableService', function(ProductService) {
    var t = [
        { id: 1, order : false, orderId : null },
        { id: 2, order : false, orderId : null },
        { id: 3, order : false, orderId : null },
        { id: 4, order : false, orderId : null },
        { id: 5, order : false, orderId : null },
        { id: 6, order : false, orderId : null },
        { id: 7, order : false, orderId : null },
        { id: 8, order : false, orderId : null },
        { id: 9, order : false, orderId : null }
    ];
    
    function _all() {
        return t;
    }
    
    function _get(id) {
        for(var i = t.length - 1; i>=0; i--) {
            if(t[i].id.toString() === id.toString()) { return t[i]; }
        }
        return null;
    }
    
    function _createOrder(id) {
        var table = _get(id);
        if(table !== null) {
            table.order = ProductService.all().slice(0);
        }
        
        return table;
    }
    
    function _removeOrder(id) {
        var table = _get(id);
        if(table !== null) {
            table.order = false;
            table.orderId = null;
        }
        
        return table;
    }
    
    
    return {
        all: _all,
        get : _get,
        createOrder : _createOrder,
        removeOrder : _removeOrder
    };
});