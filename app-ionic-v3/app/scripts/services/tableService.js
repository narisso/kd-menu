'use strict';
angular.module('Menu.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('TableService', function() {
    var t = [
         { id: 1, status : true },
         { id: 2, status : true },
         { id: 3, status : false },
         { id: 4, status : false },
         { id: 5, status : true },
         { id: 6, status : false },
         { id: 7, status : true },
         { id: 8, status : false },
         { id: 9, status : true }
    ];
    
    return {
        all: function() {
            return t;
        },
        get: function(id) {
            for(var i = t.length - 1; i>=0; i--) {
                if(t[i].id.toString() === id.toString()) return t[i];
            }
            return null;
        }
    };
});