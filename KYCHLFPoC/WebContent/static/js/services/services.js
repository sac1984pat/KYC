App.factory('mainService',function($http, $q){
	
	return{
		
		getDetails: function(details, url){
			var deffered = $q.defer();
			//var url = url + '/registrar';
			$http.post(url, details).
			success(function(data, status, headers, config){
				deffered.resolve(data);
			}).
			error(function(data, status, headers, config){
				deffered.reject(data);
			});

			return deffered.promise;
		},
	
		getLogin: function(url){
			var deffered = $q.defer();
			//var url = url + '/registrar';
			$http.get(url).
			success(function(data, status, headers, config){
				deffered.resolve(data);
			}).
			error(function(data, status, headers, config){
				deffered.reject(data);
			});
	
			return deffered.promise;
		}
	  
	}
	
	
});

