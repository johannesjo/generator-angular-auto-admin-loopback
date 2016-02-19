'use strict';

/**
 * @ngdoc directive
 * @name <%=moduleName%>.directive:login
 * @description
 * # login
 */
angular.module('<%=moduleName%>')
    .directive('login', function ()
    {
        return {
            templateUrl: '<%=fullComponentsPath%>/auth/login/login-d.html',
            restrict: 'E',
            scope: {},
            controller: function ($scope, Auth)
            {
                $scope.login = function ()
                {
                    return Auth.login($scope.user.email, $scope.user.password);
                };
            }
        };
    });
