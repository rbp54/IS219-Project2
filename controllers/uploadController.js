var mongoose = require('mongoose'),
    db = mongoose.connection;

var College = require('../model/college');

exports.index = function(req, res, next) {
    res.render('upload');
}

exports.upload = function(data, callback) {
    if (data) {
        mongoose.connect('mongodb://localhost/colleges');

        db.once('open', function() {

            var numRows = data.length;
            var numCols = data[0].length;

            // Row0 is the header row..
            for (var row = 1; row < numRows; row++ ) {
                var college = {};

                for (var col = 0; col < numCols; col++) {
                    college[data[0][col]] = data[row][col];
                }

                var collegeDoc = new College(college);
                collegeDoc.save();
            }
            mongoose.connection.close();
            callback();
        })
    }
};