(function () {
	'use strict';
	
	angular
		.module('iot_app')
		.config(configuration);
	
	function configuration ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './home/home.html',
				controller: 'HomeController'
			})
			.state('slots', {
				url: '/slots',
				templateUrl: './slots/slots.html',
				controller: 'SlotsController'
			})
			.state('stats', {
				url: '/stats',
				templateUrl: './stats/stats.html',
				controller: 'StatsController'
			})
			.state('logout', {
				url: '/logout',
				controller: 'LoginController'
			});
	}
	
})();
