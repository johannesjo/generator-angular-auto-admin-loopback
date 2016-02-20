/**
 * @ngdoc function
 * @name <%= moduleName %>.filter:flexible
 * @description
 * # flexible
 * Filter of <%= moduleName %>. Allows using filters conditionally and flexibly
 */

(function() {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .filter('flexible', flexible);

    /* @ngInject */
    function flexible($interpolate) {
        return flexibleFilter;

        function flexibleFilter() {
            var value = arguments[0];

            if (arguments.length > 1 && !!arguments[1]) {
                var copiedArgs = Array.prototype.slice.call(arguments);
                // delete value
                copiedArgs.splice(0, 1);
                // join to allow multiple params
                var joinedArgs = copiedArgs.join(':');
                var result = $interpolate('{{value | ' + joinedArgs + '}}');
                return result({value: value});
            } else {
                return value;
            }
        }
    }
})();

