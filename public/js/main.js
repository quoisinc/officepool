"use strict";
var myApp = angular.module('officepoolApp', ['ui.router']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			var login = { name: 'login',templateUrl: '../partials/login.html',url: 'login' };
			var forgotPassword = { name: 'forgot_password',templateUrl: '../partials/forgot_password.html',url: 'password-reset' };
			$stateProvider.state(login);
			$stateProvider.state(forgotPassword);
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
	        		console.log(error);
	        	});
	       $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
			  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
			
			});
	       $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
			  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
			  console.log(unfoundState, fromState, fromParams);
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
      
  };
});


/**************************************************************/




/************************************************************/
		/*Controller Logic Goes Here*/

myApp.controller('MainController',['$scope','user','$state',function($scope,user,$state){
 $scope.loginSubmit = function(data) { 
       				 var results = user.login(data);
       				 results.then(function(data){
       				 	if(data.success)
       				 	{
       				 		console.info('changing view');
       				 	}
       				 	else
       				 	{
       				 		console.warn('error');
       				 		$state.transitionTo('forgot_password');
       				 	}
       				 });
       				}
}]);



/**************************************************************/