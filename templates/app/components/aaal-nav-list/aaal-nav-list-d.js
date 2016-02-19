/**
 * @ngdoc directive
 * @name <%= moduleName %>.directive:aaalNavList
 * @description
 * # aaalNavList
 */
(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .directive('aaalNavList', function() {
            return {
                templateUrl: '<%=fullComponentsPath%>/aaal-nav-list/aaal-nav-list-d.html',
                restrict: 'E',
                scope: {},
                controller: function($scope, aaalNavListConstant) {
                    $scope.aaalNavList = aaalNavListConstant;
                }
            };
        });
})();
