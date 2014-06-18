'use strict';
angular.module('Menu.services')

/**
 * A simple example service that returns some data.
 */

.factory('TableService', function(ProductService) {
    var t = [
        { id: 1, order : false },
        { id: 2, order : false },
        { id: 3, order : false },
        { id: 4, order : false },
        { id: 5, order : false },
        { id: 6, order : false },
        { id: 7, order : false },
        { id: 8, order : false },
        { id: 9, order : false }
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