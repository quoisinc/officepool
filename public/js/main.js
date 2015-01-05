"use strict";
var myApp = angular.module('officepoolApp', ['ui.router','validation.match']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			var forgotPassword = { name: 'forgot',templateUrl: '../partials/forgot_password.html',url: 'forgot' };
			var login = { name: 'login',templateUrl: '../partials/login.html',url: 'login' };
			var register = { name: 'register',templateUrl: '../partials/register.html',url: 'register' };
			$stateProvider.state(forgotPassword);
			$stateProvider.state(login);
			$stateProvider.state(register);
			
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

			  $('#loading').fadeOut( 400, "linear" );
			
			});
	       $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){

			  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name. :',fromState);
			  console.log(unfoundState, fromState, fromParams);
			});
	       $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			  $('#loading').fadeIn( 400, "linear" );
		          
		        
			});

			$state.transitionTo('login');

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


/**************************************************************/




/************************************************************/
		/*Controller Logic Goes Here*/

myApp.controller('MainController',['$scope','user','$state',function($scope,user,$state){
 
 $scope.loginSubmit = function(data) { 
       				 var results = user.login(data);
       				 $scope.loginForm.submitted = true;
       				 results.then(function(data){
       				 	console.log(data);
       				 	var original = $scope.loginForm;
       				 	if(data.data.success)
       				 	{
       				 		console.info('changing view');

       				 		return $state.go('forgot');
       				 	}
       				 	else
       				 	{
       				 		//set our login form to invalid state
       				 		/*$scope.loginForm = angular.copy(original);
       				 		$scope.loginForm.$setPristine();*/
       				 		//$scope.loginForm['username'].$setValidity('server',false);
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