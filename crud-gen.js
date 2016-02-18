var fs = require('fs');
var helper = require('./helper');

module.exports = {
    createCrudFiles: function(generator, model) {
        generator.composeWith('aaal:overview', {
                args: [model.name],
                options: {
                    model: model
                }
            },
            {
                local: require.resolve('./overview')
            });
        generator.composeWith('aaal:edit', {
                args: [model.name],
                options: {
                    model: model
                }
            },
            {
                local: require.resolve('./edit')
            });
        generator.composeWith('aaal:view', {
                args: [model.name],
                options: {
                    model: model
                }
            },
            {
                local: require.resolve('./view')
            });

    },

    createFiles: function(generator, modelDir) {
        var modelDefinitions = helper.getModelData(generator.destinationPath(modelDir));

        for (var i = 0; i < modelDefinitions.length; i++) {
            var model = modelDefinitions[i];
            this.createCrudFiles(generator, model);
        }
    },

    createNavStr: function(generator, modelDefinitions, baseState, stateSuffix) {
        function createNavStr(navArray) {
            var ind = '    ';
            var navArrayString = '';

            for (var i = 0; i < navArray.length; i++) {
                var item = navArray[i];
                navArrayString += '\n' + ind + ind + '{\n';
                navArrayString += ind + ind + ind + 'name: \'' + item.name + '\',\n';
                navArrayString += ind + ind + ind + 'stateName: \'' + item.stateName + '\'\n';
                navArrayString += ind + ind + '}';
                if (i < navArray.length - 1) {
                    navArrayString += ',';
                }
            }

            return navArrayString;
        }

        var navArray = [];
        for (var i = 0; i < modelDefinitions.length; i++) {
            var model = modelDefinitions[i];
            navArray.push({
                name: model.name,
                stateName: baseState + model.name + stateSuffix
            });
        }

        return createNavStr(navArray);
    }
};