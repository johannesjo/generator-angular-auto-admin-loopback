'use strict';

describe('Factory: AuthInterceptor', function () {
    // load the service's module
    beforeEach(module('<%=moduleName%>'));

    // instantiate service
    var AuthInterceptor;
    beforeEach(inject(function (_AuthInterceptor_) {
        AuthInterceptor = _AuthInterceptor_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});