'use strict';

var parkease = angular.module("parkease", ["ngRoute"]);

parkease.config(["$routeProvider",  function($routeProvider) {

	$routeProvider.
		when('/', {
			templateUrl: '../partials/home.html',
			controller: 'SignInCtrl'
		}).
		when('/listspace', {
			templateUrl: '../partials/listSpace.html',
			controller: 'ListSpaceCtrl'
		}).
		when('/findspace', {
			templateUrl: '../partials/findSpace.html',
			controller: 'FindSpaceCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);