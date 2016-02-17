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
    var IND = '    ';
    var template = tplUrl ? ',\n' + IND + IND + IND + IND + 'templateUrl: \'' + tplUrl + '\'' : '';
    ctrl = ctrl ? ',\n' + IND + IND + IND + IND + 'controller: \'' + ctrl + '\'' : '';
    var code = '' +
        '.state(AAAL_BASE_STATE + \'' + name + '\', {' +
        '\n' + IND + IND + IND + IND + 'url: \'' + url + '\'' +
        ctrl +
        template +
        '\n' + IND + IND + IND + '})';
    exports.addToFile(routesFile, code, exports.STATE_NEEDLE);

    that.log.writeln(chalk.green(' updating') + ' %s', path.basename(routesFile));
};


exports.simpleObjectToString = simpleObjectToString;


function simpleObjectToString(obj, startIndent)
{
    var IND = '    ';

    function handleTypes(item, startIndent)
    {
        var str = '';
        if (typeof(item) === "boolean") {
            str += item ? 'true' : 'false';
        } else if (typeof item === 'number') {
            str += item;
        } else if (typeof item === 'string') {
            str += '\'' + item + '\'';
        } else if (item instanceof Array) {
            str += createArrayStr(item, startIndent + IND);
        } else if (typeof item === 'object') {
            str += createObjStr(item, startIndent + IND);
        }
        return str;
    }

    function createArrayStr(arr, startIndent)
    {
        var arrStr = '[';
        for (var i = 0; i < arr.length; i++) {
            var arrItem = arr[i];
            arrStr += '\n' + startIndent + IND;
            arrStr += handleTypes(arrItem, startIndent);

            if (i < arr.length - 1) {
                arrStr += ',';
            }
        }
        arrStr += '\n' + startIndent + ']';

        return arrStr;
    }

    function createObjectPropsStr(obj, key, startIndent, i)
    {
        var objPropsStr = '';
        var prop = obj[key];
        var objLength = Object.keys(obj).length - 1;

        objPropsStr += '\n' + startIndent + IND + '\'' + key + '\': ';
        objPropsStr += handleTypes(prop, startIndent);

        if (i < objLength) {
            objPropsStr += ',';
        }

        return objPropsStr;
    }

    function createObjStr(obj, startIndent)
    {
        var str = '';
        var i = 0;
        str += '{';
        for (var key in obj) {
            str += createObjectPropsStr(obj, key, startIndent, i);
            i++;
        }
        str += '\n' + startIndent + '}';
        return str;
    }


    if (obj instanceof Array) {
        return createArrayStr(obj, startIndent);
    } else {
        return createObjStr(obj, startIndent);
    }
}

