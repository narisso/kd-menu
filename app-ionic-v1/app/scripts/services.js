'use strict';
angular.module('Menu.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('Products', function() {
    var p = [
         {
             id : 1,
             cat : 'Aperitivo',
             name : 'Empanadas surtidas',
             desc : 'Deliciosas empanadas de camarón, queso y aceituna para disfrutar de a 3 personas.',
             precio : '7990',
             img : ['emapandas.jpg']
         },
         {
             id : 2,
             cat : 'Plato Principal',
             name : 'Filete a lo pobre',
             desc : 'Jugoso filete acompañado de papas fritas, cebolla y huevo.',
             precio : '11990',
             img : ['bistec.jpg']
         },
         {
             id : 3,
             cat : 'Plato Principal',
             name : 'Tallarines a la Bolognesa',
             desc : 'La más exquisita pasta fresca servida con salsa de tomates y carne.',
             precio : '6990',
             img : ['tallarines.jpg']
         },
         {
             id : 4,
             cat : 'Postre',
             name : 'Helado Artesanal',
             desc : '3 bolitas de helado artesanal. Sabores disponibles: Frambuesa, frutilla, vainilla y piña.',
             precio : '2990',
             img : ['helado.jpg']
         },
         {
             id : 5,
             cat : 'Bebidas',
             name : 'Coca-Cola',
             desc : '',
             precio : '1200',
             img : ['cocacola.jpg']
         },
         {
             id : 6,
             cat : 'Bebidas',
             name : 'Coca-Cola Light',
             desc : 'Brownie relleno con chocolate fundido',
             precio : '4590',
             img : ['cocacolalight.png']
         },
         {
             id : 7,
             cat : 'Bebidas',
             name : 'Jugo de Frambuesa',
             desc : 'Jugo natural',
             precio : '1900',
             img : ['frambuesa.jpg']
         },
         {
             id : 8,
             cat : 'Cervezas',
             name : 'Cristal 300cc',
             desc : '',
             precio : '1500',
             img : ['cristal.jpg']
         },
         {
             id : 9,
             cat : 'Cervezas',
             name : 'Cristal 500cc',
             desc : '',
             precio : '1990',
             img : ['cristal.jpg']
         },
         {
             id : 10,
             cat : 'Cervezas',
             name : 'Austral Calafate',
             desc : '',
             precio : '2600',
             img : ['austral.jpg']
         },
         {
             id : 11,
             cat : 'Cervezas',
             name : 'Schop Kunstmann Torobayo',
             desc : '',
             precio : '2800',
             img : ['kunstmann.jpg']
         }
    ];
    
    return {
        all: function() {
            return p;
        },
        get: function(id) {
            for(var i = p.length - 1; i>=0; i--) {
                if(p[i].id.toString() === id.toString()) return p[i];
            }
            return null;
        }
    };
})

.factory('Tables', function() {
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
})

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
});
