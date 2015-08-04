var Temperature = require('../models/tempModel.js');

module.exports = function (req, res) {
    Temperature.find(function(err, temps) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(temps);
        }
    });
};
