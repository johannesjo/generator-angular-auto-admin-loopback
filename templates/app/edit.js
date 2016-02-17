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

    .controller('<%= classedName %><%= nameSuffix %>', function myFunc($scope, $state, TestModel, ngToast) {
        'use strict';

        function postSave() {
            ngToast.create('Saved');
            $state.go('<%= overviewStateFull %>');
        }

        var ModelService = TestModel;
        $scope.vm = {};

        if ($state.params.id) {
            $scope.vm.model = ModelService.findById({id: $state.params.id});
        }

        // form field definition
        $scope.vm.fields = <%= formlyFields %>;


        $scope.vm.createOrUpdate = function() {
            // update
            if ($scope.vm.model.id) {
                var modelInstance = new ModelService($scope.vm.model);
                $scope.submitPromise = modelInstance.$save()
                    .then(postSave);
            }
            // create
            else {
                $scope.submitPromise = ModelService.create($scope.vm.model)
                    .$promise
                    .then(postSave);
            }
        };
    });