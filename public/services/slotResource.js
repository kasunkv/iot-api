(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('slotResource', SlotResources);

    function SlotResources ($resource, API_URL) {
        return $resource(API_URL + '/api/slot/get');
    }
})();
