var fs = require('fs');

module.exports = {
    getModelData: function (generator, modelDir)
    {
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

    createFiles: function (generator, modelDir)
    {
        var modelDefinitions = this.getModelData(generator, modelDir);

        for (var i = 0; i < modelDefinitions.length; i++) {
            var model = modelDefinitions[i];
            console.log(model);

            generator.composeWith('aaal:overview', {
                    args: [model.name]
                },
                {
                    local: require.resolve('./overview')
                });
            generator.composeWith('aaal:edit', {
                    args: [model.name]
                },
                {
                    local: require.resolve('./edit')
                });
        }
    }
};