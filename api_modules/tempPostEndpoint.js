var Temperature = require('../models/tempModel.js');

module.exports = function (req, res) {
    var temp = req.body;
    var newTemp = new Temperature({
        value: temp.value,
        timeStamp: new Date().getTime().toString()
    });

    newTemp.save(function (err) {
        if(err) {
            return res.status(500).json({message: 'Data POST Failed!'});
        }
        return res.status(200).json({message: 'Success'});
    });
};
