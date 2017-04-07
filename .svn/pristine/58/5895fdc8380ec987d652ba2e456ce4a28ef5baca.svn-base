App.controller('loginCtrl',['$scope', '$rootScope', '$state', 'mainService', '$localStorage', '$http', function($scope ,$rootScope, $state, mainService, $localStorage, $http){

$scope.LoggedUser={};
	$scope.login = function(userid,pwd){
	
			$scope.loginUrl='static/json/doc.json';
				mainService.getLogin($scope.loginUrl).then(function(result){
					if(result.Failure){
						$scope.error = result;
						return false;
					}
					else if (result){
						//console.log(result.updateUsers)
							for(var i=0;i<result.updateUsers.length;i++){
								//console.log(result.updateUsers[i])
								if(result.updateUsers[i].userID == userid && result.updateUsers[i].password==pwd){
									$scope.error="";
									$scope.LoggedUser={
											ipAddress:result.updateUsers[i].blockchainIPAddress,
											chainCode:result.updateUsers[i].chainCode,
											password:result.updateUsers[i].password,
											port:result.updateUsers[i].port,
											userid:result.updateUsers[i].userID,
											bankName:result.updateUsers[i].bankName,
									}
									localStorage.setItem('loggedUser',JSON.stringify($scope.LoggedUser));
									//console.log($scope.LoggedUser)
									logon()
									//break;
								}else{
									$scope.error="Wrong Username and Password"
									//break;
								}
								
							}
				
				}
						
		}, function(error){
			$scope.error = error;
		});
				

		function logon(){	
				$scope.loggedUser=JSON.parse(localStorage.getItem('loggedUser'))
				//console.log($scope.loggedUser.ipAddress)
				
								
				$scope.ipAddress = $scope.loggedUser.ipAddress;	
				$scope.port = $scope.loggedUser.port;
				
					$scope.error = "";
					$scope.url = 'http://'+ $scope.ipAddress + ':' + $scope.port;
					$scope.fullUrl = $scope.url + '/registrar';
					$localStorage.url = $scope.url;
					
					
					$scope.loginDetails = {
						  "enrollId": $scope.userid,
						  "enrollSecret": $scope.pwd
						  
						  };
					mainService.getDetails($scope.loginDetails, $scope.fullUrl).then(function(result){
						if(result.Failure){
							$scope.error = result;
							return false;
						}
						else if (result.OK){
							$state.go('operation');
							}
									
					}, function(error){
						$scope.error = error;
					});
				};
				
		
	};

}]);

