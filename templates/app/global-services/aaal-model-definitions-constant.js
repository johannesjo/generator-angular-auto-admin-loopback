/**
 * @ngdoc constant
 * @name <%= moduleName %>.aaalModelDefinitions
 * @description
 * # aaalModelDefinitions
 * Constant in the <%= moduleName %>.
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .constant('aaalModelDefinitions', <%- modelDefinitionsStr %>);
})();
