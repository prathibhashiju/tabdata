(function () {
    'use strict';

    angular
        .module('app')
        .factory('BookService', Service);

    function Service(DataService) {
        var service = DataService('/api/books');
        return service;
    }
})();
