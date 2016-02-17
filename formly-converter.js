var helper = require('./helper');
var fs = require('fs');

function getModelData(modelDir) {
    // read model definitions
    var modelDefinitions = [];
    var files = fs.readdirSync(modelDir);
    for (var i in files) {
        var filename = files[i];
        // check if json
        if (filename.substr(filename.lastIndexOf('.') + 1) === 'json') {
            var modelDefinition = require(modelDir + '/' + filename);
            modelDefinitions.push(modelDefinition);
        }
    }
    return modelDefinitions;
}

function convertModelToFormly(model) {
    var formlyFields = [];

    for (var key in model.properties) {
        var field = model.properties[key];
        var tplOpts = {};
        var formlyField = {
            templateOptions: tplOpts
        };

        formlyField.key = key;

        // types
        if (field.formlyType) {
            formlyField.type = field.formlyType;
        }
        else if (field.type === 'string' || field.type === 'number') {
            formlyField.type = 'input';
        }
        else if (field.type === 'date') {
            formlyField.type = 'input';

            //formlyField.type = 'datepicker';
            //tplOpts.datepickerPopup = 'dd-MMMM-yyyy';
            //tplOpts.type = 'date';
            //tplOpts.datepickerOptions = {};
        }

        // tpl opts
        if (field.formlyOpts) {
            tplOpts = field.formlyOpts;
        }

        tplOpts.label = key;
        if (field.required) {
            tplOpts.required = true;
        }


        formlyFields.push(formlyField);
    }

    return formlyFields;
}

var modelData = getModelData('/home/johannes/www/angular-auto-admin-loopback/common/models');
var formlyData = convertModelToFormly(modelData[0]);


module.exports = convertModelToFormly;
