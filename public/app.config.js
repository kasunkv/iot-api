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
			.state('logout', {
				url: '/logout',
				controller: 'LoginController'
			});
	}
	
})();
