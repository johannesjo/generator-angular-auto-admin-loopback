'use strict';

describe('The home view', function ()
{
    var page;

    beforeEach(function ()
    {
        browser.get('http://localhost:3000/index.html');
        page = require('./home.po');
    });

    it('runs e2e tests', function ()
    {
        expect(page.body.count()).toBeGreaterThan(1);
    });

});
