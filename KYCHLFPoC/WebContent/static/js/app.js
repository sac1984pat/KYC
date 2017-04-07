var App = angular.module('App', ['ui.router',  'ngAnimate', 'ui.bootstrap',  'ui.tab.scroll', 'ngStorage', 'ui.bootstrap']);

App.config(function($stateProvider, $urlRouterProvider,  $httpProvider){
	
$urlRouterProvider.otherwise("/main");	

$stateProvider 
		  .state('main', {
				url: "/main",
				templateUrl: "static/partials/main.html",
        	
		}).state('login', {
	        url: "/login",
	        templateUrl: "static/partials/login.html",
	        controller:'loginCtrl',
	    }).state('index', {
	        url: "/index",
	        templateUrl: "static/partials/index.html",
	        controller : "mainCtrl"
	    }).state('success', {
			url: "/success",
			templateUrl: "static/partials/success.html",
			controller : "successCtrl",
			params : {
	        	successMsg:null
			}
	    }).state('operation',{
			url:"/operation",
			templateUrl:"static/partials/operation.html",
			controller:"operationCtrl",
		
		}).state('add',{
			url:"/add",
			templateUrl:"static/partials/addKYC.html",
			controller:"addKycCtrl",
		}).state('update',{
			url:"/update",
			templateUrl:"static/partials/updateKYC.html",
			controller:"updateCtrl",	
			params:{
				queryObj:null
			}
		
		}).state('operationQuery', {
			url:"/operationQuery",
			templateUrl:"static/partials/operationQuery.html",
			controller:"operationQueryCtrl",
			params:{
				queryObj:null,
				listRoute:null,
				updateQueryObj:null
			}
		});

});

App.factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {
        request: function (config) {

            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config);

        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return $q.reject(response);
        }
    };
});

App.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
	$httpProvider.interceptors.push(function ($q, $location, $injector) {
	    return {
		'responseError': function (rejection) {
			if(rejection.status == 400){
				return $q.reject(rejection);
			}else {
				
			}
			
			
		}
	    };
	}); 
});

App.directive("loader", function ($rootScope, $timeout) {
	return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return element.show();
        });
        return $scope.$on("loader_hide", function () {
            return element.hide();
        });
    };
});

