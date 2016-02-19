/**
 * @ngdoc service
 * @name <%=moduleName%>.Auth
 * @description
 * # Auth
 * Factory in the <%=moduleName%>.
 */
(function() {
    'use strict';

    angular
        .module('<%=moduleName%>')
        .factory('Auth', function(User, $rootScope, $state, $localStorage) {

            function login(email, password) {
                return User
                    .login({
                        rememberMe: true
                    }, {
                        email: email, password: password
                    })
                    .$promise
                    .then(function(response) {
                        $rootScope.currentUser = $localStorage.currentUser = {
                            id: response.user.id,
                            tokenId: response.id,
                            email: email
                        };

                        if ($state.nextAfterLogin) {
                            $state.go($state.nextAfterLogin.name, $state.nextAfterLoginParams);
                            $state.nextAfterLogin = null;
                        } else {
                            $state.go('private.dashboard');
                        }
                    });
            }

            function logout() {
                return User
                    .logout()
                    .$promise
                    .then(function() {
                        $rootScope.currentUser = $localStorage.currentUser = null;
                        $state.go('login');
                    });
            }

            function register(email, password) {
                return User
                    .create({
                        email: email,
                        password: password
                    })
                    .$promise;
            }

            return {
                login: login,
                logout: logout,
                register: register
            };
        });
})();
