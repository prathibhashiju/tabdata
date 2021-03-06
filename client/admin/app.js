﻿(function () {
    'use strict';

    angular
        //.module('app', ['ui.router','ui.bootstrap','ui.utils','datatables'])
.module('app', ['ui.router','datatables'])
        .config(config)
        .run(run);

    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('books', {
                url: '/books',
                templateUrl: 'books/index.view.html',
                controller: 'Books.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'books' }
            })
            .state('books/add', {
                url: '/books/add',
                templateUrl: 'books/add-edit.view.html',
                controller: 'Books.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'books' }
            })
            .state('books/edit', {
                url: '/books/edit/:_id',
                templateUrl: 'books/add-edit.view.html',
                controller: 'Books.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'books' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.view.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
.state('home', {
                url: '/home',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            });

    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();
