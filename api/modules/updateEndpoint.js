(function () {
	'use strict';

	var Record = require('../models/recordModel.js');
	var Slot = require('../models/slotModel.js');

	module.exports = function(req, res) {
		var statusUpdate= req.query;
		console.log('Update From Carpark...', statusUpdate);
		
		Slot.findOne({
			slotId: statusUpdate.slotId
		}, function (err, existingSlot){
			if (err) { return res.status(500).send({ message: 'Error, searching for slots' }); }

			if (existingSlot) { // If the slot exists then the request is from one of the empty slots. Create a new record.

				if (existingSlot.availability) { // if slot available mark slot not available, create a new record
					
					// Prep update
					var searchOptions = { slotId: statusUpdate.slotId };
					var updateData = { 
						availability: false,
						tagId: statusUpdate.tagId
					};
					var updateOptions = {};


					Slot.update(searchOptions, updateData, updateOptions, function (err, affected) {
						if (err) {
							return res.status(500).json({ message: 'Error! Updating Slot.' });
						}
						// create the new bill record
						createBillingRecord(statusUpdate, res);
					});
				} 

			} else { // if the record does not exists, the the request is from the gate. Complete the bill

				Record.find({
					tagId: statusUpdate.tagId
				}, function (err, records) {
					if (err) { return res.status(500).send({ message: 'Error, searching for records' }); }

					var inCompleteRecord = records.pop();
					
					Slot.findOne({
						slotId: inCompleteRecord.slotId
					}, function (err, slot) {
						if (err) { return res.status(500).send({ message: 'Error, searching for slot' }); }

						var searchOptions = { slotId: slot.slotId };
						var updateData = { 
							availability: true,
							tagId: null
						};
						var updateOptions = {};

						Slot.update(searchOptions, updateData, updateOptions, function (err, affected) {
							if (err) {
								return res.status(500).json({ message: 'Error! Updating Slot.' });
							}
							// create the new bill record
							finalizeBillingRecord(statusUpdate, res);
						});
					});
				});
			}
		});
	};	

	function createBillingRecord (slotData, res) {
		console.log('Inside Create Billing Record');
		var newRecord = new Record({
            slotId: slotData.slotId,
            tagId: slotData.tagId,
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
