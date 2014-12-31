var myApp = angular.module('myApp', ['ui.router','ng-route']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){
   $locationProvider.html5Mode(true);
 	console.log($locationProvider);
	$stateProvider.state('home',{
		url : '#home',
		templateUrl: '../partials/login.html'
	}).
	state('about',{
		url : '/about',
		templateUrl : 'partials/index.html'
	});
});


/************************************************************/
		/*Controller Logic Goes Here*/





/**************************************************************/