(function () {
    'use strict';

    var Record = require('../models/recordModel.js');

    module.exports = function (req, res) {
        var record = req.query;
        //console.log(record);
        var newRecord = new Record({
            slotId: record.slotId,
            tagNo: record.tagNo,
            inTime: new Date().getTime().toString(),
            outTime: '',
            price: ''
        });

        newRecord.save(function (err) {
            if(err) {
                return res.status(500).json({message: 'Faild to save the parking record.'});
            }
            return res.status(200).json({message: 'Success'});
        });
    };

})();
