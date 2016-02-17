/**
 * @ngdoc function
 * @name <%= moduleName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= moduleName %>
 */
angular.module('<%= moduleName %>')
    //.controller('<%= classedName %><%= nameSuffix %>', function myFunc($scope, $state, <%= modelServiceName %>) {
    //    'use strict';
    //
    //    var ModelService = <%= modelServiceName %>;

    .controller('<%= classedName %><%= nameSuffix %>', function myFunc($scope, $state, TestModel) {
        'use strict';

        var ModelService = TestModel;

        if ($state.params.id) {
            $scope.model = ModelService.findById({id: $state.params.id});
        }
    });