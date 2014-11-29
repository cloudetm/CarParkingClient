parkease.controller('CashRegisterCtrl',['$scope','$location','$http',function($scope,$location,$http) {
	$http.get('data/cashRegister.json').success(function(response){
		if(response.success) {
			 $scope.info = response.data;
		}
	}).error(function(){
		alert('Error');
	})
}]);	