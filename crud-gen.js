var fs = require('fs');

module.exports = function (generator, modelDir)
{
    function getModelData()
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
    }

    var modelDefinitions = getModelData();

    for (var i = 0; i < modelDefinitions.length; i++) {
        var model = modelDefinitions[i];
        console.log(model);

        generator.composeWith('aaal:main', {
                args: [model.name]
            },
            {
                local: require.resolve('./main')
            });
    }
};