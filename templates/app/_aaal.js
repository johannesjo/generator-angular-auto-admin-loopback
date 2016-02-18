/**
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 * # <%= moduleName %>
 *
 * Main module of the application.
 */
'use strict';

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>', [
            'ngFabForm',
            'schemaForm',
            'ui.router',
            'smart-table',
            'lbServices',
            'ui.tinymce']);
})();