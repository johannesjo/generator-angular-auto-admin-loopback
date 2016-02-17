'use strict';
var ScriptBase = require('../sub-generator-base.js');
var helper = require('../helper.js');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

module.exports = ScriptBase.extend({
    initializing: function() {
        this.templateName = 'edit';
        // needs to be called manually
        this.init();
    },
    install: function() {
        // SOMEWHAT HACKY, but not possible otherwise to run
        // after file creation due to how the run queue works
        // @see http://yeoman.io/authoring/running-context.html

        this.log.writeln(chalk.yellow('injecting state into ' + this.routesFile));

        var routeUrl = '/' + this.formatNamePath(this.name) + '/' + this.formatNamePath(this.subGenCfg.subRoute);
        var tplUrl = this.tplUrl;
        var ctrl = this.classedName + (this.subGenCfg.nameSuffix || '');

        helper.injectRoute(
            this.routesFile,
            this.stateName,
            routeUrl,
            tplUrl,
            ctrl,
            this
        );
    }
});
