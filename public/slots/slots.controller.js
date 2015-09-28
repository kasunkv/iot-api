(function(){
	'use strict';

	angular
		.module('iot_app')
		.controller('SlotsController', slotsController);

	slotsController.$inject = ['$scope', '$interval', 'apiResource'];
	function slotsController ($scope, $interval, apiResource) {
		var vm  = this;
			
		var handler = $interval(function () {
			getSlots();
		}, 1500);

		$scope.$on('$destroy', function () {
			$interval.cancel(handler);
		});
		
		function getSlots () {
			apiResource
				.getParkingSlots()
				.success(function (data) {
					vm.slots = data;
				});			
		}
	}

})();