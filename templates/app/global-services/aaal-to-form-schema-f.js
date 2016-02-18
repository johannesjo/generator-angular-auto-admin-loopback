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
        .factory('aaalToSchemaForm', aaalToSchemaForm);

    /* @ngInject */
    function aaalToSchemaForm(aaalModelDefinitions) {
        return toSchemaForm;
    }

    function toSchemaForm(modelName) {
        var model = aaalModelDefinitions[modelName];
        
    }
})();

