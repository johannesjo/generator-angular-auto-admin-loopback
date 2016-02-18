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
        .config(routerHelperProvider);

    /* @ngInject */
    function routerHelperProvider($stateProvider) {

        var AAAL_BASE_STATE = '<%= baseState %>';
        var aaalBaseWithoutDot = AAAL_BASE_STATE.substring(0, AAAL_BASE_STATE.length - 1);

        $stateProvider
            .state(aaalBaseWithoutDot, {
                url: '/private',
                abstract: true,
                template: '<main ui-view></main>'
            })
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;
    }
})();

