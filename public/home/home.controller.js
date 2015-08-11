(function () {
	'use strict';
	
	angular
		.module('iot_app')
		.controller('HomeController', HomeController);
	
	function HomeController ($scope) {
		$scope.title = 'Home';
	}
})();
