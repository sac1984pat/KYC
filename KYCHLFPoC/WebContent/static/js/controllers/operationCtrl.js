App.controller('operationCtrl',['$scope', '$rootScope', '$state', 'mainService','$localStorage', '$filter', 
								function($scope, $rootScope, $state, mainService, $localStorage, $filter){
var base64file;


$scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'))

$scope.chaincodeID=$scope.loggedUser.chainCode;
$scope.enrollid=$scope.loggedUser.userid;
$scope.bankName=$scope.loggedUser.bankName;
$scope.operationlogout = function() {
	$localStorage.$reset();
	$state.go("login");
};
$scope.reload = function(){
	 $state.reload();
}

//---------------service which intiates to get data in bubbles
    $scope.method="query"
	$scope.func="GetKycCount";
			$scope.operationObj = {
					  "jsonrpc": "2.0",
					  "method": $scope.method,
					  "params": {
						  "type": 1,
						  "chaincodeID":{
							  "name":$scope.chaincodeID
						  },
						  "ctorMsg": {
							  "function": $scope.func,
							  "args":[]	
						  },
						  "secureContext": $scope.enrollid
					  },
					  "id": ''
					}

			$scope.operationObj.params.ctorMsg.args.push($scope.bankName);
			$scope.operationObj.id = 2;	
		
			$scope.fullUrl = $localStorage.url + '/chaincode';
			mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
				
				if(result.error){
					console.log(result)
					$scope.error = result.error.message;
					return false;
				}
				else if (result.result.status == 'OK'){
					if(result.id == 2){
						$scope.resultData=JSON.parse(result.result.message)
					    $scope.AllContracts=$scope.resultData.AllContracts;
						$scope.CreatedContracts=$scope.resultData.CreatedContracts;
						$scope.expiringContracts=$scope.resultData.ExpiringContracts;	
					}else{
						$scope.errorFlag=false;
						
					}
					
					}
							
			}, function(error){
				$scope.error = 'Something went wrong. Please try again later.';
			});
		
			
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };


  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];
  
  $scope.expiringKyc=function(){
	 
	  $scope.method="query"
	  $scope.func="GetKycByExpiringMonth";
		$scope.operationObj = {
				  "jsonrpc": "2.0",
				  "method": $scope.method,
				  "params": {
					  "type": 1,
					  "chaincodeID":{
						  "name":$scope.chaincodeID
					  },
					  "ctorMsg": {
						  "function": $scope.func,
						  "args":[]	
					  },
					  "secureContext": $scope.enrollid
				  },
				  "id": ''
				}

					$scope.operationObj.params.ctorMsg.args.push($scope.bankName);
					$scope.operationObj.id = 2;	
				
					$scope.fullUrl = $localStorage.url + '/chaincode';
					mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
						
						if(result.error){
							console.log(result)
							$scope.error = result.error.message;
							return false;
						}
						else if (result.result.status == 'OK'){
							if(result.id == 2){
								console.log(result)
								$state.go('operationQuery',{"queryObj":result.result.message});
								
							}else{
								$scope.errorFlag=false;
								
							}
							
							}
									
					}, function(error){
						$scope.error = 'Something went wrong. Please try again later.';
					});

  }
  
  
  $scope.totalKyc=function(){
	
	  
	  $scope.method="query"
	  $scope.func="GetKycByBankName";
		$scope.operationObj = {
				  "jsonrpc": "2.0",
				  "method": $scope.method,
				  "params": {
					  "type": 1,
					  "chaincodeID":{
						  "name":$scope.chaincodeID
					  },
					  "ctorMsg": {
						  "function": $scope.func,
						  "args":[]	
					  },
					  "secureContext": $scope.enrollid
				  },
				  "id": ''
				}  
	  $scope.operationObj.params.ctorMsg.args.push($scope.bankName);
	  $scope.operationObj.id = 2;	
	  $scope.fullUrl = $localStorage.url + '/chaincode';
	  mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
				
				if(result.error){
					console.log(result)
					$scope.error = result.error.message;
					return false;
				}
				else if (result.result.status == 'OK'){
					if(result.id == 2){
					
						$state.go('operationQuery',{"queryObj":result.result.message});
						
					}else{
						$scope.errorFlag=false;
						
					}
					
					}
							
			}, function(error){
				$scope.error = 'Something went wrong. Please try again later.';
			});
  }

  
  $scope.addedKyc=function(){
	
	  $scope.method="query"
		  $scope.func="GetKycByCreatedMonth";
					$scope.operationObj = {
							  "jsonrpc": "2.0",
							  "method": $scope.method,
							  "params": {
								  "type": 1,
								  "chaincodeID":{
									  "name":$scope.chaincodeID
								  },
								  "ctorMsg": {
									  "function": $scope.func,
									  "args":[]	
								  },
								  "secureContext": $scope.enrollid
							  },
							  "id": ''
							}

					$scope.operationObj.params.ctorMsg.args.push($scope.bankName);
					$scope.operationObj.id = 2;	
				
					$scope.fullUrl = $localStorage.url + '/chaincode';
					mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
						
						if(result.error){
							console.log(result)
							$scope.error = result.error.message;
							return false;
						}
						else if (result.result.status == 'OK'){
							if(result.id == 2){
								console.log(result)
								$state.go('operationQuery',{"queryObj":result.result.message});
								
							}else{
								$scope.errorFlag=false;
								
							}
							
							}
									
					}, function(error){
						$scope.error = 'Something went wrong. Please try again later.';
					});
  }
  
  
  
  

//	$scope.operationOptions = [{
//		"operation":"View KYC Details"
//	},{
//		"operation":"Add New KYC Details"   
//	}];
//	
	
//	$scope.selectOperation = (opt) => {
//		$scope.errorFlag=false;
//		$scope.operation = opt;
//	}
	
	 if($localStorage.chaincodeId)$scope.chaincodeID = $localStorage.chaincodeId;
	
	
	$scope.operationCall = () => {
		$scope.operation = "View KYC Details";
		$localStorage.chaincodeId = $scope.chaincodeID;
		
		if($scope.operation === "Add New KYC Details"){
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
        	$scope.errorFlag=true;
        	$scope.errorMsg = 'Please Select a PDF document.';
            //alert("Please Select a PDF")
            $("#main").val(" ")
            return false;
        }
			$scope.method = "invoke"
		}else if($scope.operation==="View KYC Details"){
			$scope.errorFlag=false;
			$scope.method = "query"
				updateHeader()
				
				
		}
	
		
 function updateHeader(){
	 $scope.func="GetKycByUserId";
		$scope.operationObj = {
								  "jsonrpc": "2.0",
								  "method": $scope.method,
								  "params": {
									  "type": 1,
									  "chaincodeID":{
										  "name":$scope.chaincodeID
									  },
									  "ctorMsg": {
										  "function": $scope.func,
										  "args":[]	
									  },
									  "secureContext": $scope.enrollid
								  },
								  "id": ''
								}
		
			
		if($scope.operation== 'Add New KYC Details'){
				$scope.operationObj.params.ctorMsg.args.push("InsertKycDetails", $scope.userid, $scope.bankName, $scope.userName, $scope.kycDoc,$scope.kYcName);
				$scope.operationObj.id = 3;			
		}else if($scope.operation == 'Update KYC Details'){
			$scope.operationObj.params.ctorMsg.args.push("UpdateKycDetails",$scope.userName, $scope.userid, $scope.bankName, $scope.kycDoc);
			$scope.operationObj.id = 3;			
	}else{
		 if($scope.userid){
			$scope.operationObj.params.ctorMsg.args.push($scope.userid);
				$scope.operationObj.id = 2;	
				}else{
					
					$scope.operationObj.params.ctorMsg.function="GetAllKyc";
					$scope.operationObj.id = 2;
				}		
			
		}
		
		$scope.fullUrl = $localStorage.url + '/chaincode';
		mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
			
			if(result.error){
				$scope.error = result.error.message;
				return false;
			}
			else if (result.result.status == 'OK'){
				if(result.id == 2){
					console.log(result)
					$state.go('operationQuery',{"queryObj":result.result.message});
				}else{
					$scope.errorFlag=false;
					$scope.successMsg = "KYC Details are added succesfully!";
				}
				
				}
						
		}, function(error){
			$scope.error = 'Something went wrong. Please try again later.';
		});
		}
	
	}
		
	$scope.clearScope = () =>{
		$scope.error='';
		$scope.successMsg='';
	}

      $(document).on('change', '.file', function(){
    	  
    	 $(".inputfile").find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    	 $scope.kYcName=$(this).val().replace(/C:\\fakepath\\/i, '');
    	 
      });


  $('input[type=file]').change(function () {
	
        var val = $(this).val().toLowerCase();

          var regex = new RegExp("(.*?)\.(pdf)$");

                 if(!(regex.test(val))) {
                       document.getElementById("main").value= " ";
                       //alert('Please select correct file format');
                       $scope.error = 'Please Select a PDF document.';
                }

});

	
}]);

