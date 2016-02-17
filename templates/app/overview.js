/**
 * @ngdoc function
 * @name <%= moduleName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= moduleName %>
 */

angular.module('<%= moduleName %>')
    //.controller('<%= classedName %><%= nameSuffix %>', function myFunc($scope, <%= modelServiceName %>) {
    //    'use strict';
    //
    //    var ModelService = <%= modelServiceName %>;

    .controller('<%= classedName %><%= nameSuffix %>', function myFunc($scope, TestModel) {
        'use strict';

        var ModelService = TestModel;
        var filter = {filter: {include: 'user'}};

        function loadModel() {
            $scope.rowCollection = ModelService.find();
        }

        //remove to the real data holder
        //remove to the real data holder
        $scope.removeItem = function removeItem(row) {
            var index = $scope.rowCollection.indexOf(row);

            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);

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
    });