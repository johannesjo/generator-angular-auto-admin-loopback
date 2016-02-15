'use strict';
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

exports.STATE_NEEDLE = '/* STATES-NEEDLE - DO NOT REMOVE THIS */';

// inspired by https://github.com/cgross/generator-cg-angular/blob/master/utils.js
exports.addToFile = function (filename, lineToAdd, beforeMarker)
{
    try {
        var fullPath = path.resolve(process.cwd(), filename);
        var fileSrc = fs.readFileSync(fullPath, 'utf8');

        var indexOf = fileSrc.indexOf(beforeMarker);
        var lineStart = fileSrc.substring(0, indexOf).lastIndexOf('\n') + 1;
        var indent = fileSrc.substring(lineStart, indexOf);
        fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + '\n' + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath, fileSrc);
    } catch (e) {
        throw e;
    }
};

exports.injectRoute = function (routesFile, name, url, tplUrl, ctrl, that)
{
    var ind = '    ';
    var template = tplUrl ? ',\n' + ind + ind + ind + ind + 'templateUrl: \'' + tplUrl + '\'' : '';
    ctrl = ctrl ? ',\n' + ind + ind + ind + ind + 'controller: \'' + ctrl + '\'' : '';
    var code = '' +
        '.state(\'' + name + '\', {' +
        '\n' + ind + ind + ind + ind + 'url: \'' + url + '\'' +
        ctrl +
        template +
        '\n' + ind + ind + ind + '})';
    exports.addToFile(routesFile, code, exports.STATE_NEEDLE);

    that.log.writeln(chalk.green(' updating') + ' %s', path.basename(routesFile));
};

