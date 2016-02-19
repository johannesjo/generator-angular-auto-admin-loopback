/**
 * @ngdoc overview
 * @name <%= moduleName %>.routes
 * @description
 * # <%= moduleName %>.routes
 *
 * Routes module. All app states are defined here.
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .config(routerHelperProvider)
        .run(function($rootScope, $state, ngToast, $localStorage) {
            if ($localStorage.currentUser) {
                $rootScope.currentUser = $localStorage.currentUser;
            }

            // prevent private loads from loading if not logged in
            $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
                // redirect to login page if not logged in
                if (next.data && next.data.authenticate && !$rootScope.currentUser) {
                    event.preventDefault(); //prevent current page from loading
                    $state.nextAfterLogin = next;
                    $state.nextAfterLoginParams = nextParams;
                    ngToast.danger('You\'re note logged in, please proceed');
                    $state.go('login');
                }
            });
        });
    ;

    /* @ngInject */
    function routerHelperProvider($stateProvider, $urlRouterProvider) {

        var AAAL_BASE_STATE = '<%= baseState %>';
        var aaalBaseWithoutDot = AAAL_BASE_STATE.substring(0, AAAL_BASE_STATE.length - 1);

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                template: '<div class="login-page"><login></login></div>'
            })
            .state(aaalBaseWithoutDot, {
                url: '/private',
                abstract: true,
                template: '<main ui-view></main>',
                data: {
                    authenticate: true
                }
            })
            .state(AAAL_BASE_STATE + 'dashboard', {
                url: '/dashboard',
                template: '<div>Hello hello!</div>'
            })

            /* STATES-NEEDLE - DO NOT REMOVE THIS */;
    }
})();

