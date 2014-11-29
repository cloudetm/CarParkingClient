'use strict';

/* App Module */

var phonecatApp  = angular.module('phonecatApp', [
	'ngRoute',
	'phonecatControllers'
]);

phonecatApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/phones', {
		templateUrl : 'partials/phone-list.html',
		controller: 'PhoneListCtrl'
	}).when('/phones/:phoneId', {
		templateUrl : 'partials/phone-details.html',
		controller: 'PhoneDetailsCtrl'
	}).otherwise({
		redirectTo: '/phones'
	});
}]);