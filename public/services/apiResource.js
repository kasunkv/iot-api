(function (){
	'use strict';

	angular
		.module('common.services')
		.factory('apiResource', apiResource);

	apiResource.$inject =['$http', 'API_URL'];

	function apiResource ($http, API_URL) {
		return {
			getParkingSlots: getParkingSlots,
			getBillingForVehicle: getBillingForVehicle
		};	

		function getParkingSlots() {
			return $http.get(API_URL + '/api/slot/get');				
		}

		function getBillingForVehicle (tagNo) {
			return $http.get(API_URL + '/api/record/tag/' + tagNo);				
		}
	}



})();
