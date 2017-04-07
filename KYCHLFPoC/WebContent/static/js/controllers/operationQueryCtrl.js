App.controller('operationQueryCtrl',['$scope', '$rootScope', '$state', 'mainService','$localStorage' ,function($scope, $rootScope, $state, mainService,$localStorage){
	$scope.result=false;
	
	$scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'))

   $scope.updateQueryObj = $state.params.updateQueryObj;
	//$scope.queryObj = JSON.parse($state.params.queryObj);
	$scope.queryObj= JSON.parse($state.params.queryObj);
	
	// To get list of users on back button 
	$scope.route=$state.params.listRoute;
				
	if($scope.route==true){
			$scope.queryObj=$localStorage.listObj;
			$scope.route==false;
			
		}
	
	if($scope.queryObj == 'No Data found' || $scope.queryObj == null ){
		$scope.noDataFound = true;
	}

	$scope.valueit=function(index,item,queryObj){
		$rootScope.newObj=item;
		$state.go('update',{"queryObj":queryObj});
	}
	   $scope.downloadPDF = function(i) {
           var dlnk = document.getElementById('dwnldLnk');
           dlnk.href = $scope.queryObj[i].KYC_DOC_BLOB;
           dlnk.click();

       }
}]);

