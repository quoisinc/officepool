"use strict";
var myApp = angular.module('myApp', ['ui.router']);
console.log('teset');
myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	var login = { name: 'login',templateUrl: 'partials/login.html',url: '/login' };
	console.log('asdfsdf');
	$stateProvider.state(login);
}]).run(['$state', function ($state) {
   $state.transitionTo('home');
}]);


/************************************************************/
		/*Controller Logic Goes Here*/





/**************************************************************/