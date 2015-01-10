"use strict";
var myApp = angular.module('officepoolApp', ['ui.router','validation.match']).config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
			$urlRouterProvider.otherwise('/');
			$httpProvider.interceptors.push('ajaxLoader');
			$httpProvider.defaults.withCredentials = true; //store our session info
			var forgotPassword = { name: 'forgot',templateUrl: '../partials/forgot_password.html',url: 'forgot' };
			var login = {name: 'login',templateUrl: '../partials/login.html',url: 'login' };
			var register = { name: 'register',templateUrl: '../partials/register.html',url: 'register' };
			var dashboard = { name: 'dashboard',templateUrl: '../partials/dashboard.html',url: 'dashboard' };
			var index =  {abstract: true,template: "test",data: {access: true };
			$stateProvider.state('public.forgot_password',forgotPassword);
			$stateProvider.state('public',index);
			$stateProvider.state('public.login',login);
			$stateProvider.state('public.register',register);
			$stateProvider.state('user.dashboard',dashboard);
			//lets configure our httpProvider factory
				
			
		}]).run(['$state','$rootScope', function ($state,$rootScope) {
			$rootScope
	        .$on('$viewContentLoaded',
	            function(event, viewConfig){ 
	                console.log("View Load: the view is loaded, and DOM rendered!");
	        });
	        $rootScope.$on('$viewContentLoading',
	            function(event, viewConfig){ 

	                console.log("View Load: the view is loading, Please wait!");
	        });
	        $rootScope
	        .$on('$stateChangeError',
	        	function(event, toState, toParams, fromState, fromParams, error){
	        		console.log('State change error :' , error);
	        	});
	       $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){

			  
			
			});
	       $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){

			  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name. :',fromState);
			  console.log(unfoundState, fromState, fromParams);
			});
	       $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			 
		          
		        
			});

			$state.transitionTo('public.login');

		}]);



/************************************************************/
		/*Factories goes here*/
myApp.factory('user', function ($http) {
 
  return {
      login: function (credentials) {
         return $http.post('/user/read', credentials);
      },

      register: function(user){
      	return $http.post('/user/create',user);
      }
      
  };
});

myApp.factory('ajaxLoader', ['$log', function($log) {  

    var myInterceptor = {
    	request : function(config){
    		$('#loading').fadeIn( 400, "linear" );
    		return config;
    	},
    	response : function(response)
    	{
    		$('#loading').fadeOut( 400, "linear" );
    		return response;
    	}
    };

    return myInterceptor;
}]);

my.factory('authentication')

/**************************************************************/




/************************************************************/
		/*Controller Logic Goes Here*/

myApp.controller('MainController',['$scope','user','$state',function($scope,user,$state){
 
 $scope.loginSubmit = function(data) { 
       				 var results = user.login(data);
       				 $scope.loginForm.submitted = true;
       				 results.then(function(data){
       				 	var original = $scope.loginForm;
       				 	if(data.data.success)
       				 	{
       				 		

       				 		return $state.go('user.dashboard');
       				 	}
       				 	else
       				 	{
       				 		//set our login form to invalid state
       				 		
       				 		$scope.loginForm.username.$setValidity('serverValidation',false);
       				 		$scope.loginForm.$setPristine();
       				 		
       				 		
       				 	}
       				 });
       				}

 $scope.registerSubmit = function(data){
 						 
 						 var results = user.register(data);
 						 results.then(data)
 						 {
 						 	console.log(data);
 						 }
 						}
}]);



/**************************************************************/