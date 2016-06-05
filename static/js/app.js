var app = angular.module("swachh", ['infinite-scroll', 'ui.router']);

app.config(["$locationProvider", function($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'MainController'
        })
        .state('app', {
            url: '/App',
            templateUrl: 'partials/app.html',
            controller: 'aboutController'
        });

});
