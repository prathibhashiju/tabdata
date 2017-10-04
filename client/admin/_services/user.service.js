(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.Update = Update;
service.Delete = Delete;
        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

function Delete(_id) {

            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
