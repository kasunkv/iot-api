(function () {
	'use strict';

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var slotSchema = new Schema({
		slotId: { type: String },
		availability: { type: Boolean, default: true }
	});

	module.exports = mongoose.model('Slot', slotSchema);
})();
