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
			})
			.state('records', {
				// abstract: true,
				url: '/records',
				templateUrl: './records/records.html',
				controller: 'RecordController as vm'
			})
			.state('records.all', {
				url: '/all',
				templateUrl: './records/records.all.html'
			})
			.state('records.tag', {
				url: '/tag',
				templateUrl: './records/records.tag.html'
			})
			.state('records.slot', {
				url: '/slot',
				templateUrl: './records/records.slot.html'
			})			
			.state('logout', {
				url: '/logout',
				controller: 'LoginController'
			});
	}
	
})();
