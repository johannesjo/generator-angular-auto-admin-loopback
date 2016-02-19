/**
 * @ngdoc directive
 * @name <%= moduleName %>.directive:aaalHeader
 * @description
 * # aaalHeader
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .directive('aaalHeader', function() {
            return {
                templateUrl: '<%=fullComponentsPath%>/aaal-header/aaal-header-d.html',
                restrict: 'E',
                scope: {},
                controller: function($scope, $state, $rootScope, Auth) {
                    $scope.$state = $state;
                    $scope.r = $rootScope;
                    $scope.logout = function() {
                        Auth.logout();
                    };
                }
            };
        });
})();
