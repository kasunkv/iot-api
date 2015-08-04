var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temperatureModel = new Schema({
    value: { type: String },
    timeStamp: { type: String }
});

module.exports = mongoose.model('Temperature', temperatureModel);
