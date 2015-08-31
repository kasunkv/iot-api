(function(){
	'use strict';

	angular
		.module('iot_app')
		.controller('SlotsController', slotsController);

	function slotsController ($interval, slots, slotResource) {
		var vm  = this;

		vm.slots = slots;
		console.log(slots);

		vm.updateSlots = function () {
			slotResource.query(function (data) {
				vm.slots = data;
			});
		};
	}

})();