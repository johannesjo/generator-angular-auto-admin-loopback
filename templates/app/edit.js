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
        $scope.vm = {};

        if ($state.params.id) {
            $scope.vm.model = ModelService.findById({id: $state.params.id});
        }

        $scope.vm.fields = <%= formlyFields %>;

        $scope.vm.onSubmit = function() {
            alert(JSON.stringify($scope.vm.model), null, 2);
        };
    });