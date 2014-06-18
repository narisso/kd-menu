'use strict';
angular.module('Menu.services')

/**
 * A simple example service that returns some data.
 */

.factory('ProductService', function() {
    var p = [
        {
            id : 1,
            cat : 'Aperitivo',
            name : 'Empanadas surtidas',
            desc : 'Deliciosas empanadas de camarón, queso y aceituna para disfrutar de a 3 personas.',
            price : '7990',
            img : ['emapandas.jpg', 'empanadas2.png']
        },
        {
            id : 2,
            cat : 'Plato Principal',
            name : 'Filete a lo pobre',
            desc : 'Jugoso filete acompañado de papas fritas, cebolla y huevo.',
            price : '11990',
            img : ['bistec.jpg']
        },
        {
            id : 3,
            cat : 'Plato Principal',
            name : 'Tallarines a la Bolognesa',
            desc : 'La más exquisita pasta fresca servida con salsa de tomates y carne.',
            price : '6990',
            img : ['tallarines.jpg']
        },
        {
            id : 4,
            cat : 'Postre',
            name : 'Helado Artesanal',
            desc : '3 bolitas de helado artesanal. Sabores disponibles: Frambuesa, frutilla, vainilla y piña.',
            price : '2990',
            img : ['helado.jpg']
        },
        {
            id : 5,
            cat : 'Bebidas',
            name : 'Coca-Cola',
            desc : '',
            price : '1200',
            img : ['cocacola.jpg']
        },
        {
            id : 6,
            cat : 'Bebidas',
            name : 'Coca-Cola Light',
            desc : 'Brownie relleno con chocolate fundido',
            price : '4590',
            img : ['cocacolalight.png']
        },
        {
            id : 7,
            cat : 'Bebidas',
            name : 'Jugo de Frambuesa',
            desc : 'Jugo natural',
            price : '1900',
            img : ['frambuesa.jpg']
        },
        {
            id : 8,
            cat : 'Cervezas',
            name : 'Cristal 300cc',
            desc : '',
            price : '1500',
            img : ['cristal.jpg']
        },
        {
            id : 9,
            cat : 'Cervezas',
            name : 'Cristal 500cc',
            desc : '',
            price : '1990',
            img : ['cristal.jpg']
        },
        {
            id : 10,
            cat : 'Cervezas',
            name : 'Austral Calafate',
            desc : '',
            price : '2600',
            img : ['austral.jpg']
        },
        {
            id : 11,
            cat : 'Cervezas',
            name : 'Schop Kunstmann Torobayo',
            desc : '',
            price : '2800',
            img : ['kunstmann.jpg']
        }
    ];
    
    return {
        all: function() {
            return p;
        },
        get: function(id) {
            for(var i = p.length - 1; i>=0; i--) {
                if(p[i].id.toString() === id.toString()) { return p[i]; }
            }
            return null;
        }
    };
});