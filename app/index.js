'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var helper = require('../helper.js');
var defaultSettings = require('../default-settings.js');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');
var chalk = require('chalk');
var _s = require('underscore.string');


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
        this.config.defaults(defaultSettings);
        this.moduleName = this.config.get('moduleName') || 'aaal';
    },


    appJs: function appJs()
    {
        this.template('app/_app.js', this.appPath + '/scripts/aaal/_app.js');
        this.template('app/_app.spec.js', this.appPath + '/scripts/aaal/_app.spec.js');
        this.template('app/routes.js', this.appPath + '/scripts/aaal/routes.js');
        this.template('app/routes.spec.js', this.appPath + '/scripts/aaal/routes.spec.js');
    },

    install: function packageFiles()
    {
        this.on('end', function ()
        {
            //save configuration
            this.config.save();
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

