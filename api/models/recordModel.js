var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordModel = new Schema({
    slotId: { type: String },
    inTime: { type: String },
    outTime: { type: String },
    price: { type: String }
});

module.exports = mongoose.model('Record', recordModel);
