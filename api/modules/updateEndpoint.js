(function () {
	'use strict';

	var Record = require('../models/recordModel.js');
	var Slot = require('../models/slotModel.js');

	module.exports = function(req, res) {
		var statusUpdate= req.query;
		console.log(statusUpdate);
		
		// find the correct slot
		Slot.findOne({
			slotId: statusUpdate.slotId
		}, function (err, existingSlot){
			if (err) { return res.status(500).send({ message: 'Error, searching for slots' }); }

			if (existingSlot) {

				if (existingSlot.availability) { // if slot available mark slot not available, create a new record
					
					// Prep update
					var searchOptions = { slotId: statusUpdate.slotId };
					var updateData = { availability: false };
					var updateOptions = {};


					Slot.update(searchOptions, updateData, updateOptions, function (err, affected) {
						if (err) {
							return res.status(500).json({ message: 'Error! Updating Slot.' });
						}

						// create the new bill record
						createBillingRecord(statusUpdate, res);
					});

				} else { // else (not available),mark slot available, complete the record, calculate price, send push notification

					// Prep update
					var searchOptions = { slotId: statusUpdate.slotId };
					var updateData = { availability: true };
					var updateOptions = {};


					Slot.update(searchOptions, updateData, updateOptions, function (err, affected) {
						if (err) {
							return res.status(500).json({ message: 'Error! Updating Slot.' });
						}

						// create the new bill record
						finalizeBillingRecord(statusUpdate, res);
					});
				}
			}
		});
	};	

	function createBillingRecord (slotData, res) {
		console.log('Inside Create Billing Record');
		var newRecord = new Record({
            slotId: slotData.slotId,
            tagNo: slotData.tagNo,
            inTime: new Date().getTime().toString(),
            outTime: '',
            price: ''
        });

        newRecord.save(function (err) {
            if(err) {
                return res.status(500).json({message: 'Error! Creating Billing Record'});
            }
            return res.status(200).json({message: 'Success!. New Billing Record Created.'});
        });
	}

	function finalizeBillingRecord (slotData, res) {
		console.log('Inside Finalize Billing Record');
		Record.find({
			tagNo: slotData.tagNo
		}, function (err, docs) {
			if (err) {
				return res.status(500).json({message: 'Error! Finding Billing Record'});
			}

			console.log(docs);
			var lastRecord = docs.pop();
			lastRecord.outTime = new Date().getTime().toString();
			lastRecord.price = calculatePrice(lastRecord.outTime, lastRecord.inTime, 3);

			Record.update({ _id: lastRecord._id }, lastRecord, {}, function (err, affected) {
				if (err) {
					return res.status(500).json({message: 'Error! Updating Billing Record'});
				}

				Slot.update({ slotId: lastRecord.slotId }, { availability: true }, {}, function (err, affected) {
					if (err) {
						return res.status(500).json({message: 'Error! Updating Slot'});
					}
					return res.status(200).json({ message: 'Success!. Billing Record & Slot Updated.' });
				});

			});
		});
	}

	function calculatePrice (inTime, outTime, basePrice) {
		return Math.ceil(((Math.abs(inTime) - Math.abs(outTime)) / (1000 * 60)) * basePrice).toString();
	}

})();
