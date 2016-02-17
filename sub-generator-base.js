'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var defaultSettings = require('./default-settings.js');
var helper = require('./helper.js');
var chalk = require('chalk');
var fs = require('fs');
var _s = require('underscore.string');
var _ = require('lodash');

module.exports = yeoman.generators.NamedBase.extend({
    constructor: function() {
        // super constructor needs to be called manually
        // as the constructor-function is overwritten by this
        yeoman.generators.NamedBase.apply(this, arguments);

        // define global options
        this.option('openInEditor');

        // set all the different name versions to be used in the templates
        this.setModuleNames(this.name);

        // set app name
        this.setAppVariables();

        // set sources root (for file-templates)
        var sourceRoot = '/templates/app';
        this.sourceRoot(path.join(__dirname, sourceRoot));

        // additional variables
        this.createdFiles = [];
    },

    /**
     *  parent initialize function, inherited by sub-gens
     */
    init: function() {
        this.mergeConfig();
        this.overWriteTplPathIfSet();

        // injection & template vars
        // set current subgen
        this.subGenCfg = this.subGenerators[this.templateName];
        // the state name is the argument
        this.stateName = this.name + this.subGenCfg.stateSuffix;
        // template vars
        this.modelServiceName = this.options.model.name;
        this.modelOptions = helper.simpleObjectToString(this.options.model, '        ');
        this.overviewStateFull = this.baseState + this.name + this.subGenerators.overview.stateSuffix;
        this.editStateFull = this.baseState + this.name + this.subGenerators.edit.stateSuffix;
        this.viewStateFull = this.baseState + this.name + this.subGenerators.view.stateSuffix;


        // instead use target folder to set the path
        this.targetFolder = path.join(this.dirs.routes);
        // names need to be reset
        this.setModuleNames(this.name);

        // create overview files
        this.generateSourceAndTest(this.templateName);
    },

    /**
     * helper function to merge default settings with the ones
     * provided by the .yo-rc.json
     */
    mergeConfig: function() {
        // create a clone to avoid testing issues
        var defaultCfg = _.cloneDeep(defaultSettings);
        _.merge(defaultCfg, this.config.getAll());
        _.merge(this, defaultCfg);
    },

    /**
     * allows overwriting of the template path of the generator
     * so users can specifiy their own template path
     */
    overWriteTplPathIfSet: function() {
        if (this.customTemplatesPath) {
            if (fs.existsSync(this.customTemplatesPath)) {
                this.sourceRoot(this.customTemplatesPath);
            } else {
                throw (new Error('custom template path ' + this.customTemplatesPath + ' does not exist. Check your .yo-rc.json.'));
            }
        }
    },

    /**
     * set the app variables, e.g. the name of the app in the
     * different required formats such as camelized or slugified
     */
    setAppVariables: function() {
        this.moduleName = this.config.get('moduleName') || 'aaal';
    },

    /**
     * sets all the different name versions to be used in the templates
     * @param name{string}
     */
    setModuleNames: function(name) {
        this.cameledName = _s.camelize(name);
        this.classedName = _s.classify(name);
        this.sluggedName = _s.slugify(name);
        this.dashedName = _s.dasherize(name);
        this.humanizedName = _s.humanize(name);
    },

    /**
     * helper function to get rid of potential parent paths
     * @param path{string}
     * @returns {string}
     */
    stripModuleAndAppPaths: function(path) {
        path = path
            .replace(this.dirs.basePath, '')
            .replace(this.dirs.app, '');
        return path;
    },

    /**
     * helper function to format the path names to the preferred
     * style as configured in the .yo-rc.json
     * @param name{string}
     * @returns {string}
     */
    formatNamePath: function(name) {
        var style = this.config.get('pathOutputStyle') || 'dasherize';
        // first letter to lowercase to prevent issues with dasherize
        name = name.charAt(0)
                .toLowerCase() + name.slice(1);
        return _s[style](name);
    },

    /**
     *
     * @returns {string}
     */
    defineTargetFolder: function() {
        var realTargetFolder;

        // allow creating sub-modules via reading and parsing the path argument
        if (this.targetFolder) {
            this.targetFolder = this.stripModuleAndAppPaths(this.targetFolder);
            realTargetFolder = path.join(this.targetFolder);
        } else {
            if (this.curGenCfg.globalDir) {
                realTargetFolder = this.curGenCfg.globalDir;
            } else {
                realTargetFolder = '.'
            }
        }

        // check if a same named parent directory should be created
        // for directives and routes
        if (this.curGenCfg.createDirectory && !this.options.noParentFolder) {
            realTargetFolder = path.join(realTargetFolder, this.formatNamePath(this.name));
        }

        return realTargetFolder;
    },

    /**
     * main file-creation pipeline function
     * @param templateName
     */
    generateSourceAndTest: function(templateName) {
        this.templateName = templateName;
        this.curGenCfg = this.subGenerators[templateName];

        var realTargetFolder = this.defineTargetFolder();
        var filesToCreate = [];

        // create file paths
        var inAppPath = path.join(this.dirs.basePath, realTargetFolder);
        var generatorTargetPath = path.join(this.dirs.app, inAppPath);
        var standardFileName = (this.curGenCfg.prefix || '') + this.formatNamePath(this.name) + (this.curGenCfg.suffix || '');

        // prepare template template and data
        this.tplUrl = path.join(inAppPath, standardFileName + this.fileExt.tpl)
            // windows fix for url path
            .replace(/\\/g, '/');
        filesToCreate.push({
            tpl: this.templateName + this.fileExt.tpl,
            targetFileName: standardFileName + this.fileExt.tpl
        });
        if (this.addStyleFiles === true) {
            filesToCreate.push({
                tpl: this.stylePrefix + this.templateName + this.fileExt.style,
                targetFileName: this.stylePrefix + standardFileName + this.fileExt.style
            });
        }

        // add main file to queue
        filesToCreate.push({
            tpl: templateName + this.fileExt.script,
            targetFileName: standardFileName + this.fileExt.script
        });

        // add test file to queue
        if (this.addTestFiles === true) {
            filesToCreate.push({
                tpl: templateName + this.testSuffix + this.fileExt.script,
                targetFileName: standardFileName + this.testSuffix + this.fileExt.script
            });
        }

        // create files and create a files array for further use
        for (var i = 0; i < filesToCreate.length; i++) {
            var fileToCreate = filesToCreate[i];
            var outputFile = path.join(generatorTargetPath, fileToCreate.targetFileName);
            var customYoRcTpl = this.getCustomTplFromYoRc(fileToCreate);

            // add to created files array
            this.createdFiles.push(outputFile);

            // set name suffix accordingly to template
            if (fileToCreate.gen) {
                this.nameSuffix = fileToCreate.gen.nameSuffix || '';
            } else {
                this.nameSuffix = this.curGenCfg.nameSuffix || '';
            }


            if (customYoRcTpl) {
                this.writeCustomYoRcTpl(customYoRcTpl, outputFile);
            } else {
                this.fs.copyTpl(
                    this.templatePath(fileToCreate.tpl),
                    this.destinationPath(outputFile),
                    this
                );
            }
        }
        this.afterFileCreationHook();
    },

    /**
     * checks for custom templates defined in the .yo-rc.json
     * if set they will be used instead of the default ones
     * @param fileToCreate
     * @returns {string}
     */
    getCustomTplFromYoRc: function(fileToCreate) {
        var customYoRcTpl;
        var curGenCfg = null;
        var SPEC_REG_EX = new RegExp(this.testSuffix + '\\' + this.fileExt.script + '$');
        var SCRIPTS_REG_EX = new RegExp(this.fileExt.script + '$');
        var TPL_REG_EX = new RegExp(this.fileExt.tpl + '$');
        var STYLE_REG_EX = new RegExp(this.fileExt.style + '$');

        if (fileToCreate.gen) {
            curGenCfg = this.subGenerators[fileToCreate.gen];
        } else {
            curGenCfg = this.curGenCfg;
        }

        // WHY is this necessary??
        if (curGenCfg.tpl) {
            if (fileToCreate.tpl.match(SPEC_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['spec'];
            } else if (fileToCreate.tpl.match(SCRIPTS_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['script'];
            } else if (fileToCreate.tpl.match(TPL_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['tpl'];
            } else if (fileToCreate.tpl.match(STYLE_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['style'];
            }

            if (customYoRcTpl && typeof customYoRcTpl === 'string') {
                return customYoRcTpl;
            }
        }
    },

    /**
     * helper function used to create files by using the custom
     * template string and underscores templating language
     * @param customYoRcTpl{string}
     * @param targetDir{string}
     */
    writeCustomYoRcTpl: function(customYoRcTpl, targetDir) {
        var tpl = _.template(customYoRcTpl, {})(this);
        this.fs.write(targetDir, tpl);
    },

    /**
     * things done after all files are created
     */
    afterFileCreationHook: function() {
        // run favorite ide (first to smooth the experiance)
        if (this.options.openInEditor) {
            this.spawnCommand(this.editorCommand, this.createdFiles);
        }

        // inject all files after creation
        if (!this.options.skipInject) {
            this.spawnCommand('gulp', ['injectAll']);
        }
    }
});


