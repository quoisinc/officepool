"use strict";
var myApp = angular.module('officepoolApp', ['ui.router']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			var forgotPassword = { name: 'forgot',templateUrl: '../partials/forgot_password.html',url: 'forgot' };
			var login = { name: 'login',templateUrl: '../partials/login.html',url: 'login' };
			$stateProvider.state(forgotPassword);
			$stateProvider.state(login);
			
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
			  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
			
			});
	       $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){

			  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name. :',fromState);
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
       				 		return $state.go('forgot_password');
       				 	}
       				 	else
       				 	{
       				 		console.warn('error');
       				 		return $state.go('forgot');
       				 	}
       				 });
       				}
}]);



/**************************************************************/