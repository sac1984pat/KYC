App.controller('updateCtrl',['$scope', '$rootScope', '$state', 'mainService','$localStorage','$stateParams' ,'$filter', 
								function($scope, $rootScope, $state, mainService, $localStorage, $filter,$stateParams){
	//$scope.operation.operation="Update KYC Details";
	
	if($localStorage.chaincodeId)$scope.chaincodeID = $localStorage.chaincodeId;

	$scope.queryObj= $state.params.queryObj;
	$localStorage.listObj=$scope.queryObj;
	
	$scope.userName=$rootScope.newObj.USER_NAME;
	$scope.userid=$rootScope.newObj.USER_ID;
	$scope.bankName=$rootScope.newObj.KYC_BANK_NAME;
	$scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'))

	$scope.chaincodeID=$scope.loggedUser.chainCode;
	$scope.enrollid=$scope.loggedUser.userid;
	$scope.bankName=$scope.loggedUser.bankName;
	
	$scope.operation = "View KYC Details";
	
	$scope.updateCall = function (){
		$localStorage.chaincodeId = $scope.chaincodeID;
		
				var newFile= $(":file")[0].files[0]
				 
				  if(newFile &&(newFile.type=='application/pdf')){
				      
					  var reader = new FileReader();
					  reader.readAsDataURL(newFile);
	    
	                 reader.onload = function () {
	                	 $scope.kycDoc=reader.result;
		                    updateHeader()  
	                 };
	          }
	          else{
	        	  $scope.error = 'Please Select a PDF document.';
	              //alert("Please Select a PDF")
	              $("#main").val(" ")
	              return false;
	          }

		
		
	}
	
	
	 function updateHeader(){
		 $scope.method="invoke"
			$scope.operationObj = {
									  "jsonrpc": "2.0",
									  "method": $scope.method,
									  "params": {
										  "type": 1,
										  "chaincodeID":{
											  "name":$scope.chaincodeID
										  },
										  "ctorMsg": {
											 "args":[]
										  },
										  "secureContext": $scope.enrollid
									  },
									  "id": ''
									}
			
		
				$scope.operationObj.params.ctorMsg.args.push("UpdateKycDetails",$scope.userid,$scope.userName,$scope.kycDoc);
				$scope.operationObj.id = 1;			
		
			
			$scope.fullUrl = $localStorage.url + '/chaincode';
			mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
				$scope.operation = "View KYC Details";
				if(result.error){
					$scope.error = result.error.message;
					return false;
				}
				else if (result.result.status == 'OK'){
					if(result.id == 1){
						console.log(result)
						//$state.go('operationQuery',{updateQueryObj:"KYC Details are Updated succesfully!"});
						$state.go('operation');
					}else{
						//$state.go('operationQuery',{updateQueryObj:"KYC Details are Updated succesfully!"});
						$scope.successMsg = "KYC Details are Updated succesfully!";
					
					}
					
					}
							
			}, function(error){
				$scope.error = 'Something went wrong. Please try again later.';
			});
			
		
}
  $(document).on('change', '.file', function(){
    	  
    	  $(".inputfile").find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
}]);

