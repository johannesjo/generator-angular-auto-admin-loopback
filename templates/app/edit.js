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
    function <%= classedName %><%= nameSuffix %>($state, ngToast, aaalToSchemaForm, <%= modelServiceName %>) {
        var vm = this;
        var ModelService = <%= modelServiceName %>;

        //form and schema definition
        vm.schema = aaalToSchemaForm('<%= modelServiceName %>');
        vm.form = [
            '*',
            {
                type: 'submit',
                title: 'Save'
            }
        ];

        // load or create new instance
        if ($state.params.id) {
            vm.model = ModelService.findById({id: $state.params.id});
        } else {
            vm.model = {};
        }


        function postSave() {
            ngToast.create('Saved');
            $state.go('<%= overviewStateFull %>');
        }

        vm.createOrUpdate = function() {
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
