(function () {
	'use strict';

	var Slot = require('../models/slotModel.js');

	module.exports = function (req, res) {
		var slotData = req.query;
		console.log(slotData);

		Slot.findOne({
			slotId: slotData.slotId
		}, function (err, existingSlot) {
			if (err) { return res.status(500).send({ message: 'Error!' }); }

			if (existingSlot) {
				// update the availability status of the slot
				var updatePackage = { 
					availability: slotData.available
				};

				var updateOptions = {};
				
				Slot.update({ slotId: slotData.slotId }, updatePackage, updateOptions, function (err, affected) {
					if (err) { 
						return res.status(500).send({ message: 'Error! Updating Slot.' });
					}

					if (slotData.available) {	
						updateExistingRecord(res);
					} else {
						createNewRecord(slotData, res);						
					}					
				});

			} else {
				// create the new slot for use
				var newSlot = new Slot({
					slotId: slotData.slotId,
					availability: slotData.available
				});

				newSlot.save(function (err) {
					if (err) {
						return res.status(500).json({message: 'Error! Creating new Slot'});
					}

					createNewRecord(slotData, res);
				});

			}

		});		
	};

	function createNewRecord (slotData, res) {
		console.log('Inside Create New Record');
		var newRecord = new Record({
            slotId: slotData.slotId,
            tagNo: slotData.tagNo,
            inTime: new Date().getTime().toString(),
            outTime: '',
            price: ''
        });

        newRecord.save(function (err) {
            if(err) {
                return res.status(500).json({message: 'Error! Creating new Record'});
            }
            return res.status(200).json({message: 'Success'});
        });
	}

	function updateExistingRecord (res) {
		console.log('Inside Update Existing Record');
	}

})();
