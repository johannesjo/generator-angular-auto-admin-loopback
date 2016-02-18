/**
 * @ngdoc constant
 * @name <%= moduleName %>.aaalToSchemaForm
 * @description
 * # aaalToSchemaForm
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

        function toSchemaForm(modelName) {
            var model = aaalModelDefinitions[modelName];
            var schema = {
                type: 'object',
                title: modelName,
                properties: {}
            };

            for (var key in model.properties) {
                var modelProperty = model.properties[key];
                console.log(key, modelProperty);
                schema.properties[key] = {
                    type: modelProperty.type,
                    title: key
                };

            }

            console.log(schema);

            return schema;
        }
    }


})();

