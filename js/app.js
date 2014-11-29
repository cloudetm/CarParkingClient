'use strict';

var parkease = angular.module("parkease", ["ngRoute"]);

parkease.config(["$routeProvider",  function($routeProvider) {

	$routeProvider.
		when('/', {
			templateUrl: '../partials/home.html',
			controller: 'signinCtrl'
		}).
		when('/home', {
			templateUrl: '../partials/home.html',
			controller: 'signinCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);