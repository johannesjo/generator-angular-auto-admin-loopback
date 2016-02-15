'use strict';
var ScriptBase = require('../sub-generator-base.js');
var helper = require('../helper.js');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var defaultSettings = require('../default-settings.js');

module.exports = ScriptBase.extend({
    initializing: function ()
    {
        // needs to be called manually
        this.init();

        // the state name is the argument
        this.stateName = this.name;

        // create path string from name
        var PARENT_STATES_REG_EXP = new RegExp('([^\\.]+)\\.', 'g');
        var parentStates = this.name.match(PARENT_STATES_REG_EXP);
        var parentStatePath = '';
        if (parentStates) {
            for (var i = 0; i < parentStates.length; i++) {
                var stateStr = parentStates[i].replace('.', '');
                stateStr = this.formatNamePath(stateStr);
                parentStatePath = path.join(parentStatePath, stateStr);
            }
        }

        // set name to base-name only to work with the usual generators
        this.name = this.name.replace(PARENT_STATES_REG_EXP, '');
        // instead use target folder to set the path
        this.targetFolder = path.join(this.dirs.routes, parentStatePath);

        // names need to be reset
        this.setModuleNames(this.name);
    },

    prompting: function ()
    {
        var done = this.async();
        var defaults = {
            createTemplate: true,
            createService: false,
            createCtrl: true
        };

        function createControllerFiles(props)
        {
            // set context vars
            this.createService = props.createService;
            this.createTemplate = props.createTemplate;
            this.skipMainFiles = !props.createCtrl;
            this.createController = props.createCtrl;

            // create controller files
            this.generateSourceAndTest('controller');
            done();
        }

        if (this.options.useDefaults || this.config.get('alwaysSkipDialog')) {
            createControllerFiles.bind(this)(defaults);
        } else {
            this.prompt(
                [
                    {
                        type: 'confirm',
                        name: 'createCtrl',
                        message: 'Would you like to create a controller for the route?',
                        default: defaults.createCtrl
                    },
                    {
                        type: 'confirm',
                        name: 'createTemplate',
                        message: 'Would you like to create a html-template-file and a scss-file for the route?',
                        default: defaults.createTemplate
                    },
                    {
                        type: 'list',
                        name: 'createService',
                        message: 'Would you like to create a service or factory for the route?',
                        default: defaults.createService,
                        choices: [
                            {
                                name: 'No',
                                value: false
                            },
                            {
                                name: 'a service',
                                value: 'service'
                            },
                            {
                                name: 'a factory',
                                value: 'service'
                            }
                        ]
                    }
                ],
                createControllerFiles.bind(this));
        }
    },

    writing: function (props)
    {
        var that = this;
        var done = this.async();

        // check if routes file does exist and create it if not
        if (that.uiRouter && that.routesFile) {
            fs.stat(that.routesFile, function (err, stat)
            {
                // if no route-file exist
                if (err) {
                    that.fs.copyTpl(
                        that.templatePath('routes' + that.fileExt.script),
                        that.destinationPath(that.routesFile),
                        that
                    );
                    that.log.writeln(chalk.yellow('Creating routes file at ' + that.routesFile + ' as none was present at the specified location'));
                    that.injectIntoRoutesFile = true;
                    done();
                } else {
                    that.injectIntoRoutesFile = true;
                    done();
                }
            });
        } else {
            this.log.writeln(chalk.yellow('No routes file provided in config or injection deactivated'));
            done();
        }
    },

    install: function ()
    {
        // SOMEWHAT HACKY, but not possible otherwise to run
        // after file creation due to how the run queue works
        // @see http://yeoman.io/authoring/running-context.html

        if (this.injectIntoRoutesFile) {
            this.log.writeln(chalk.yellow('injecting state into ' + this.routesFile));

            var routeUrl = '/' + this.formatNamePath(this.name),
                tplUrl = this.tplUrl,
                ctrl = !!this.createController && this.classedName + (this.subGenerators.controller.nameSuffix || '');

            helper.injectRoute(
                this.routesFile,
                this.stateName,
                routeUrl,
                tplUrl,
                ctrl,
                this
            );
        }
    }
});
