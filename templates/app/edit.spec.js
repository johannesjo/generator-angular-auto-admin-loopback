'use strict';

describe('Controller: <%=classedName%><%=nameSuffix%>', function ()
{

    // load the controller's module
    beforeEach(module('<%=moduleName%>'));

    var <%=classedName%><%=nameSuffix%>;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope)
    {
        scope = $rootScope.$new();
        <%=classedName%><%=nameSuffix%> = $controller('<%=classedName%><%=nameSuffix%>', {
            $scope: scope
            // place mocked dependencies here
        });
    }));

    it('should ...', function ()
    {
        expect(true).toBe(<%=testPassOnDefault%>);
    });
});