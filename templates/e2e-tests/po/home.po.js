/**
 * This file uses the Page Object pattern
 * @see https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function ()
{
    this.body = element(by.css('body'));
};

MainPage.prototype.goTo = function ()
{
    return browser.get('/');
};

module.exports = new MainPage();
