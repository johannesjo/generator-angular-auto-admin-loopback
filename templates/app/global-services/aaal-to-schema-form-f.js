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
        .module('aaal')
        .factory('aaalToSchemaForm', aaalToSchemaForm);

    var PROPERTIES_TO_COPY = [
        'type',
        'required',
        'format'
    ];
    var PROPERTIES_TO_TRANSFORM = [
    ];

    var transformations = {
    };


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

            schema.properties = processModelProperties(model.properties, schema.properties);
            console.log(schema.properties);

            return schema;
        }


        function processPropertyProperties(modelProperty) {
            var schemaPropertyProperties = {};

            for (var key in modelProperty) {
                if (modelProperty.hasOwnProperty(key)) {
                    var modelPropertyProperty = modelProperty[key];

                    if (PROPERTIES_TO_COPY.indexOf(key) > -1) {
                        schemaPropertyProperties[key] = modelPropertyProperty;
                    } else if (PROPERTIES_TO_TRANSFORM.indexOf(key) > -1) {
                        schemaPropertyProperties[key] = transformations[key](modelPropertyProperty);
                    }
                }
            }

            // handle arrays
            if (modelProperty.type instanceof Array) {
                schemaPropertyProperties.type = 'array';
                delete schemaPropertyProperties.required;
                schemaPropertyProperties.items = processArrayDefinitions(modelProperty.type);
            }

            // handle dates
            if (modelProperty.type === 'date') {
                schemaPropertyProperties.type = 'string';
                schemaPropertyProperties.format = 'date';
            }

            return schemaPropertyProperties;
        }


        function processModelProperties(modelProperties, schemaProperties) {
            for (var key in modelProperties) {
                if (modelProperties.hasOwnProperty(key)) {
                    var modelProperty = modelProperties[key];
                    schemaProperties[key] = processPropertyProperties(modelProperty);
                }
            }

            return schemaProperties;
        }


        function processArrayDefinitions(arrayTypeDefinition) {
            var schemaDef = {};
            for (var i = 0; i < arrayTypeDefinition.length; i++) {
                var def = arrayTypeDefinition[i];
                if (def === 'object') {
                    schemaDef.type = 'object';
                    schemaDef.title = 'type \'object\' cannot be generated, use form definition';
                } else if (def === 'string') {
                    schemaDef.type = 'string';
                    break;
                } else if (typeof def === 'object') {
                    // TODO this is still a little buggy with loopback
                    if (!schemaDef.type) {
                        schemaDef.type = 'object';
                        schemaDef.properties = {};
                        schemaDef.required = [];
                    }
                    schemaDef.properties[def.name] = processPropertyProperties(def);
                    if (schemaDef.properties[def.name].required) {
                        // this leads to weird behaviour of the schema form...
                        //schemaDef.required.push(def.name);
                        delete schemaDef.properties[def.name].required;
                    }
                }
            }

            return schemaDef;
        }
    }
})();
