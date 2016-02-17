var fs = require('fs');

module.exports = {
    getModelData: function(generator, modelDir) {
        // read model definitions
        var modelDefinitions = [];
        var files = fs.readdirSync(modelDir);
        for (var i in files) {
            var filename = files[i];
            // check if json
            if (filename.substr(filename.lastIndexOf('.') + 1) === 'json') {
                var modelDefinition = require(generator.destinationPath(modelDir + '/' + filename));
                modelDefinitions.push(modelDefinition);
            }
        }
        return modelDefinitions;
    },

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
        var modelDefinitions = this.getModelData(generator, modelDir);

        for (var i = 0; i < modelDefinitions.length; i++) {
            var model = modelDefinitions[i];
            this.createCrudFiles(generator, model);
        }

        this.createNav(generator, modelDefinitions);
    },

    createNav: function(generator, modelDefinitions) {
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
                stateName: generator.baseState + model.name + generator.subGenerators.overview.stateSuffix
            });
        }

        generator.navConstants = createNavStr(navArray);

        // create files
        var dirs = generator.dirs;
        var componentsPath = dirs.app + '/' + dirs.basePath + '/' + dirs.components;
        generator.template('app/aaal-nav-list-constant.js', componentsPath + '/aaal-nav-list-constant.js');
        generator.template('app/aaal-nav-list-d.html', componentsPath + '/aaal-nav-list-d.html');
        generator.navListDirectiveTplUrl = dirs.basePath + '/' + dirs.components + '/aaal-nav-list-d.html';
        generator.template('app/aaal-nav-list-d.js', componentsPath + '/aaal-nav-list-d.js');

    }
};