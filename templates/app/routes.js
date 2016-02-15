/**
 * @ngdoc overview
 * @name <%= moduleName %>.routes
 * @description
 * # <%= moduleName %>.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('<%= moduleName %>')
    .config(function ($stateProvider, $urlRouterProvider)
    {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;

    });