(function(){
	'use strict';

	angular
		.module('iot_app')
		.controller('RecordController', recordController);

	recordController.$inject = ['apiResource'];
	function recordController (apiResource) {
		var vm = this;

		vm.records = 
		apiResource
			.getBillingRecords()
			.success(function (data) {
				vm.records = data;
			});
	};
})();