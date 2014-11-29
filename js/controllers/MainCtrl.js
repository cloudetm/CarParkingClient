parkease.controller('MainCtrl',['$scope','$location','$http',function($scope,$location,$http) {
	$scope.whiteBg = false;

	$scope.$on('changeBg', function(e, isWhite){
		$scope.whiteBg = isWhite;
	});
}]);