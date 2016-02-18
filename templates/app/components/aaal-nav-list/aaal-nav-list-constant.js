/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * # <%= moduleName %>
 *
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .constant('aaalNavListConstant',
            [
                //<%- navConstants %>
            ]);
})();
