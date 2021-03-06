﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('Books.AddEditController', Controller);

    function Controller($stateParams, $location, $filter, BookService, UserService,AlertService) {
        var vm = this;
vm.userid=null;
        vm.book = {};
        vm.saveBook = saveBook;
        vm.deleteBook = deleteBook;

        initController();

        function initController() {
            vm.loading = 0;
UserService.GetCurrent().then(function (user) {
                vm.userid = user._id;

            });
            if ($stateParams._id) {
                vm.loading += 1;
                BookService.GetById($stateParams._id)
                    .then(function (book) {
                        vm.loading -= 1;
                        vm.book = book;
                    });
            }
        }

        function saveBook() {
vm.book.userid=vm.userid;
            BookService.Save(vm.book)
                .then(function () {
                    AlertService.Success('Book saved', true);
                    $location.path('/books');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }

        function deleteBook() {
            BookService.Delete(vm.book._id)
                .then(function () {
                    AlertService.Success('Book deleted', true);
                    $location.path('/books');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }
    }

})();
