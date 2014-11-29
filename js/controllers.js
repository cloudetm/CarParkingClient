'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

/*function PhoneListCtrl($scope, $http) {
	$scope.phones = [{
		'name': 'Nexus S',
    	'snippet': 'Fast just got faster with Nexus S.',
    	'age': 3
    }, {
    	'name': 'Motorola XOOM™ with Wi-Fi',
    	'snippet': 'The Next, Next Generation tablet.',
    	'age': 1
    }, {
    	'name': 'MOTOROLA XOOM™',
    	'snippet': 'The Next, Next Generation tablet.',
    	'age' : 2
   	}];
}*/

//PhoneListCtrl.$inject = ['$scope', '$http'];
//phonecatApp.controller('PhoneListCtrl', PhoneListCtrl);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http){
    $scope.query = ''
    $scope.orderProp = 'age'
    $http.get('phones/phones.json').success(function(resp){
        $scope.phones = resp;
    });
}]);


phonecatControllers.controller('PhoneDetailsCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    //$scope.phoneId = $routeParams.phoneId;
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(resp){
        $scope.phone = resp;
    });
}]);

phonecatApp.controller('UserCtrl', function($scope){
	$scope.firstName = 'Gnanasuriyan';
	$scope.lastName = 'Anbalagan';
});