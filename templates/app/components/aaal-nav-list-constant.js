/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * # <%= moduleName %>
 *
 * Routes module. All app states are defined here.
 */

'use strict';

angular.module('<%= moduleName %>')
    .constant('aaalNavListConstant',
    [
        <%- navConstants %>
    ]);