parkease.controller('ListSpaceCtrl',['$scope','$location','$http',function($scope,$location,$http) {

	$scope.locateSpace =  function(){
		debugger
		$location.path('/locatespace');
	}


}]);