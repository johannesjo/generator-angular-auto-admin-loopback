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

module.exports = yeoman.generators.Base.extend({
    constructor: function ()
    {
        yeoman.generators.Base.apply(this, arguments);

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

    config: function ()
    {
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


    appJs: function appJs()
    {
        this.template('app/_aaal.js', this.dirs.app + '/_aaal.js');
        this.template('app/aaal-routes.js', this.routesFile);

        if (this.addTestFiles === true) {
            this.template('app/_aaal.spec.js', this.dirs.app + '/_aaal.spec.js');
            this.template('app/aaal-routes.spec.js', this.dirs.app + '/aaal-routes.spec.js');
        }
    },

    runCrudGenerator: function ()
    {
        crudGen.createFiles(this, this.pathToModels);
    },

    install: function packageFiles()
    {
        this.on('end', function ()
        {
            //save configuration
            this.config.save();
            this.spawnCommand('bower', ['install', 'angular-ui-router', 'ng-fab-form', 'angular-formly', 'angular-formly-templates-bootstrap', '--save']);
        });
    },
    postRun: function ()
    {
        this.on('dependenciesInstalled', function ()
        {
            this.spawnCommand('gulp', ['serve']);
        });
    }
});

