/**
 * @ngdoc function
 * @name <%= moduleName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= moduleName %>
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .controller('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>($state, <%= modelServiceName %>) {
        var vm = this;
        var ModelService = <%= modelServiceName %>;

        function postSave() {
            ngToast.create('Saved');
            $state.go('<%= overviewStateFull %>');
        }

        if ($state.params.id) {
            vm.model = ModelService.findById({id: $state.params.id});
        }

        //form field definition
        vm.fields = <%- formlyFields %>;

        vm.createOrUpdate = function($scope, $state, ngToast, <%= modelServiceName %>) {
            // update
            if (vm.model.id) {
                var modelInstance = new ModelService(vm.model);
                vm.submitPromise = modelInstance.$save()
                    .then(postSave);
            }
            // create
            else {
                vm.submitPromise = ModelService.create(vm.model)
                    .$promise
                    .then(postSave);
            }
        };
    }
})();
