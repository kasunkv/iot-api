var Record = require('../models/recordModel.js');

module.exports = function (req, res) {
    Record.find(function(err, records) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(records);
        }
    });
};
