(function () {
	'use strict';
	
	angular
		.module('iot_app')
		.config(configuration)
		.constant('API_URL', 'http://localhost:88');
	
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
				controller: 'SlotsController as vm',
				resolve: {
					slotResource: 'slotResource',
					slots: function (slotResource) {
						return slotResource.query().$promise;
					}
				}
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
