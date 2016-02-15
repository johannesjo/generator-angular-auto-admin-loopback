'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var exec = require('child_process').exec;
var fs = require('fs');


describe('gulp inject', function ()
{
    var instancePath = path.join(__dirname, '../.test-instance');
    var gulp = '$(which gulp)';
    this.timeout(20000);

});