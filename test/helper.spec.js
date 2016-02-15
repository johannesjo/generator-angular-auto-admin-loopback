'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helperScripts = require('../helper.js');
var fs = require('fs');

describe('moda Helper-Scripts', function ()
{
    helperScripts.STATE_NEEDLE = '/* NEEEEEEDLE */';

    describe('addToFile', function ()
    {
        var fn = helperScripts.addToFile;
        var code = 'alert("asd");';
        var needle = '/* NEEEEEEDLE */';
        var testFile = path.join(__dirname, '.tmp/test-file.js');
        var testFileContent = needle;


        beforeEach(function (done)
        {
            fs.writeFile(testFile, testFileContent, function (err)
            {
                if (err) {
                    return console.log(err);
                }
                done();
            });
        });

        afterEach(function (done)
        {
            // remove files
            fs.unlink(testFile, function ()
            {
                done();
            });
        });

        it('injects code above a needle', function ()
        {
            fn(testFile, code, needle);
            assert.fileContent([
                [testFile, 'alert("asd");\n/* NEEEEEEDLE */']
            ]);

            // works multiple times
            fn(testFile, code, needle);
            assert.fileContent([
                [testFile, 'alert("asd");\nalert("asd");\n/* NEEEEEEDLE */']
            ]);
        });
    });

    describe('injectRoute', function ()
    {
        var fn = helperScripts.injectRoute;
        var needle = '/* NEEEEEEDLE */';
        var routesFile = path.join(__dirname, '.tmp/test-route.js');
        var routesFileContent = needle;
        var url = '/some-url';
        var mockGen = {
            log: {
                writeln: function ()
                {

                }
            }
        };

        beforeEach(function (done)
        {
            // create test routes file
            fs.writeFile(routesFile, routesFileContent, function (err)
            {
                if (err) {
                    return console.log(err);
                }
                done();
            });
        });

        afterEach(function (done)
        {
            // remove files
            fs.unlink(routesFile, function ()
            {
                done();
            });
        });

        it('injects state above a needle', function ()
        {
            fn(routesFile, 'test.name', url, false, false, mockGen);
            assert.fileContent([
                [routesFile, /test\.name/],
                [routesFile, url],
                [routesFile, /test\.name/],
                [routesFile, /test\.name/],
                [routesFile, /\.state\('test\.name', \{\s*url:\s*'\/some-url'\s*}\)\s*\/\* NEEEEEEDLE \*\//]
            ]);
        });

        it('injects the controller and template if given', function ()
        {
            fn(routesFile, 'test.name', url, 'some.html', 'SomeCtrl', mockGen);
            assert.fileContent([
                [routesFile, /test\.name/],
                [routesFile, url],
                [routesFile, 'SomeCtrl'],
                [routesFile, 'some.html'],
                [routesFile, /\.state\('test\.name', \{\s*url:\s*'\/some-url',\s*controller:\s*'SomeCtrl',\s*templateUrl:\s*'some.html'\s+}\)\s*\/\* NEEEEEEDLE \*\//]
            ]);
        });

        it('injects the a template if given', function ()
        {
            fn(routesFile, 'test.name', url, 'some.html', false, mockGen);
            assert.fileContent([
                [routesFile, /test\.name/],
                [routesFile, url],
                [routesFile, 'some.html'],
                [routesFile, /\.state\('test\.name', \{\s*url:\s*'\/some-url',\s*templateUrl:\s*'some.html'\s+}\)\s*\/\* NEEEEEEDLE \*\//]
            ]);
        });
    });
});