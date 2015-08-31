(function () {
	'use strict';

	var Slot = require('../models/slotModel.js');
	var Record = require('../models/recordModel.js');

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
						return res.status(500).json({ message: 'Error! Updating Slot.' });
					}
					//return res.status(200).json({ message: 'Success!. Slot Updated.' });
					//if (slotData.slotId && !slotData.available) {
					//	createNewRecord(slotData, res);
					//} else {
						updateExistingRecord(slotData, res);
					//}

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
					//return res.status(200).json({ message: 'Success!. New Slot Created.' });
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
                return res.status(500).json({message: 'Error! Creating Billing Record'});
            }
            return res.status(200).json({message: 'Success!. New Billing Record Created.'});
        });
	}

	function updateExistingRecord (slotData, res) {
		console.log('Inside Update Existing Record');
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
