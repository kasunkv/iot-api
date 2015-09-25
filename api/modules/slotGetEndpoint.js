(function () {
    'use strict';

    var Slot = require('../models/slotModel.js');
    
    module.exports = function (req, res) {
        Slot.find(function(err, records) {
            //console.log(records);
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(records);
            }
        });
    };

})();

