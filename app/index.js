'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var helper = require('../helper.js');
var defaultSettings = require('../default-settings.js');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');
var _s = require('underscore.string');
var _ = require('lodash');
var crudGen = require('../crud-gen');

module.exports = yeoman.Base.extend({
    constructor: function() {
        yeoman.Base.apply(this, arguments);

        // get app name
        this.argument('appname', {type: String, required: false});
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));


        // get app path
        try {
            this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        } catch (e) {
        }
        this.env.options.appPath = this.env.options.appPath || 'app';
        this.options.appPath = this.env.options.appPath;
        this.appPath = this.env.options.appPath;


        this.pkg = require('../package.json');
        this.sourceRoot(path.join(__dirname, '../templates'));
    },

    config: function() {
        // merge config with this context to make vars available
        // otherwise set default settings if they don't exit yet
        var currentCfg = this.config.getAll();

        if (currentCfg && !_.isEmpty(currentCfg)) {
            _.merge(this, currentCfg);
        } else {
            // create a clone to avoid testing issues
            var defaultCfg = _.cloneDeep(defaultSettings);
            _.merge(defaultCfg, currentCfg);
            _.merge(this, defaultCfg);
            this.config.defaults(defaultCfg);

        }
    },


    appJs: function appJs() {
        this.template('app/_aaal.js', this.dirs.app + '/' + this.dirs.basePath + '/_aaal.js');
        this.template('app/aaal-routes.js', this.routesFile);

        if (this.addTestFiles === true) {
            this.template('app/_aaal.spec.js', this.dirs.app + '/' + this.dirs.basePath + '/_aaal.spec.js');
            this.template('app/aaal-routes.spec.js', this.dirs.app + '/' + this.dirs.basePath + '/aaal-routes.spec.js');
        }
    },

    runCrudGenerator: function() {
        crudGen.createFiles(this, this.pathToModels);
    },

    copyGlobalServices: function() {
        // tpl vars for constants
        this.modelDefinitionsStr = helper.createModelDefinitionsStr(this.destinationPath(this.pathToModels));

        this.template('app/global-services/aaal-model-definitions-constant.js', this.dirs.app + '/' + this.dirs.basePath + '/global-services/aaal-model-definitions-constant.js');
        this.template('app/global-services/aaal-to-schema-form-f.js', this.dirs.app + '/' + this.dirs.basePath + '/global-services/aaal-to-schema-form-f.js');

    },

    copyComponents: function() {
        // create tpl vars
        var dirs = this.dirs;

        var modelDefinitions = helper.getModelData(this.destinationPath(this.pathToModels));

        this.navConstants = crudGen.createNavStr(this, modelDefinitions, this.baseState, this.subGenerators.overview.stateSuffix);
        this.fullComponentsPath = dirs.basePath + '/' + dirs.components;

        var componentsRealPath = dirs.app + '/' + dirs.basePath + '/' + dirs.components;

        // copy components
        this.directory('app/components', componentsRealPath);
    },

    createLbServices: function() {
        if (this.slcServiceCommandArgs) {
            this.spawnCommand('lb-ng', this.slcServiceCommandArgs);
        }
    },

    install: function packageFiles() {
        var requiredComponents = [
            'angular-ui-router',
            'ng-fab-form',
            'ngtoast',
            'angular-schema-form',
            'angular-smart-table',
            'ui.bootstrap',
            'angular-ui-tinymce',
            'angular-schema-form-datepicker'
        ];
        requiredComponents.unshift('install');
        requiredComponents.push('--save');

        this.on('end', function() {
            //save configuration
            this.config.save();
            this.spawnCommand('bower', requiredComponents);
        });
    },
    postRun: function() {
        this.on('dependenciesInstalled', function() {
            this.spawnCommand('gulp', ['serve']);
        });
    }
});

