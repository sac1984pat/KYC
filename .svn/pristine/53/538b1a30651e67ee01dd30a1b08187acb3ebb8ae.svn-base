App.controller('headerCtrl',['$scope',  '$rootScope', '$state', '$localStorage', function($scope,  $rootScope, $state, $localStorage){
	
	
	$rootScope.logout = function() {
		$localStorage.$reset();
		$state.go("login");
	};

	
	$scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'))
	$scope.bankName=$scope.loggedUser.bankName;
	$rootScope.currentState = $state.current.name;
	
}]);