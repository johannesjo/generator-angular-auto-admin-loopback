/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * # <%= moduleName %>
 *
 * Main module of the application.
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>', [
            'ngFabForm',
            'ngToast',
            'schemaForm',
            'ui.router',
            'smart-table',
            'lbServices',
            'ui.tinymce']);
})();