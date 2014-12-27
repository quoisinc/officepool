var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('home',{
		url : '/home',
		templateUrl: 'partials/index.html'
	});
});


/************************************************************/
		/*Controller Logic Goes Here*/





/**************************************************************/