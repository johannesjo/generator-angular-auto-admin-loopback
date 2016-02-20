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
            'ngToast',
            'schemaForm',
            'ui.router',
            'smart-table',
            'lbServices',
            'ngStorage',
            'schemaForm-tinymce'
        ]);
})();