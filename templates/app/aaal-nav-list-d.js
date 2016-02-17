'use strict';

/**
 * @ngdoc directive
 * @name <%= moduleName %>.directive:aaalNavList
 * @description
 * # aaalNavList
 */
angular.module('<%= moduleName %>')
    .directive('aaalNavList', function() {
        return {
            templateUrl: '<%= navListDirectiveTplUrl %>',
            restrict: 'E',
            scope: {},
            controller: function($scope, aaalNavListConstant) {
                $scope.aaalNavList = aaalNavListConstant;
            }
        };
    });