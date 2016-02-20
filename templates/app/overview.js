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
    function <%= classedName %><%= nameSuffix %>(<%= modelServiceName %>) {
        var vm = this;
        var ModelService = <%= modelServiceName %>;

        function loadModel() {
            vm.rowCollection = ModelService.find();
        }

        vm.viewState = '<%= viewStateFull %>';
        vm.editState = '<%= editStateFull %>';

        /**
         * you can add columns and add filters to them like so
         * {name:'modelPropertyName': filter:'date:dd/MM/yy'}
         */
        vm.columns = [
            'id',
            'title'
        ];

        //remove to the real data holder
        vm.removeItem = function removeItem(row) {
            var index = vm.rowCollection.indexOf(row);

            if (index !== -1) {
                vm.rowCollection.splice(index, 1);

                return ModelService.deleteById({id: row.id})
                    .$promise
                    .then(function() {
                        loadModel();
                    }, function() {
                        loadModel();
                    });
            }
        };

        // INIT
        loadModel();
    }
})();