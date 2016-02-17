/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * # <%= moduleName %>
 *
 */

'use strict';

angular.module('<%= moduleName %>')
    .constant('aaalNavListConstant',
    [
        <%- navConstants %>
    ]);