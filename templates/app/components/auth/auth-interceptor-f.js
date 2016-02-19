'use strict';

/**
 * @ngdoc service
 * @name <%=moduleName%>.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the <%=moduleName%>.
 */
angular.module('<%=moduleName%>')
    .factory('AuthInterceptor', function ($q, $injector, LoopBackAuth)
    {
        function handleErrConnectionRefused(rejection)
        {
            if (rejection.status === 401) {
                var ngToast = $injector.get('ngToast');
                var $state = $injector.get('$state');
                LoopBackAuth.clearUser();
                LoopBackAuth.clearStorage();

                $state.nextAfterLogin = $state.current;
                $state.nextAfterLoginParams = $state.params;

                ngToast.danger('You\'re not logged in, please proceed');
                $state.go('login');
            }

            return $q.reject(rejection);
        }

        return {
            'responseError': handleErrConnectionRefused
            // request interceptor is handled by the loopback angular component
        };
    })

    .config(function ($httpProvider)
    {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
