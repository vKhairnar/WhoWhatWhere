var app = angular.module('whoWhatWhere', ['ui.router', 'ngMap']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('business', {
            url: '/business',
            templateUrl: 'views/businessInfo.html',
            controller: 'mainController'
        }).state('info', {
            url: '/info',
            templateUrl: 'views/info.html'
        }).state('home', {
             url: '/home',
             templateUrl: 'views/home.html'
        });
});

