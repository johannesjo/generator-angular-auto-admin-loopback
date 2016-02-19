'use strict';

describe('Directive: login', function ()
{

    // load the directive's module
    beforeEach(module('<%=moduleName%>'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = $compile('<login></login>');
        expect(true).toBe(true);
    }));
});