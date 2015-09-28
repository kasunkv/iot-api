(function (){
	'use strict';

	var Slot = require('../models/slotModel');

	module.exports = function(req, res) {
		var slot = req.body;
		//console.log(slot);

		var newSlot = new Slot({
			slotId: slot.slotId,
			availability: slot.available
		});

		newSlot.save(function (err) {
			if(err) {
				return res.status(500).json({ message: 'Failed to save the slot information' });
			} else {
				return res.status(200).json({ message: 'Success' });
			}
		});
	};
	
})();
