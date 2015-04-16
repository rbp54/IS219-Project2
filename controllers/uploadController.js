var fs = require('fs');
var csvParser = require('csv-parse');
var mongoose = require('mongoose'),
    db = mongoose.connection;

var College = require('../model/college');

exports.index = function(req, res, next) {
    res.render('upload');
};

exports.parseCSV = function(req, res, next) {

    /* CSV file parser*/
    fs.readFile(req.files.myFile.path, {
        encoding: 'utf-8'
    }, function(err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                req.parsedData = data;
                next();
            }
        });
    });
};

exports.collegeData = function(req, res, next) {
    var data = req.parsedData;

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
        res.redirect('/colleges');
    });
};

exports.enrollmentData = function(req, res, next) {
    var data = req.parsedData;
    var numRows = data.length;

    mongoose.connect('mongodb://localhost/colleges');

    db.once('open', function() {

        /*
        Row0 is header row
        Col0 is UnitID
         */

        for (var row = 1; row < numRows; row++) {
            var unitId = data[row][0];

            enrollmentHelper(unitId, data, row);
        }

        mongoose.connection.close();
        res.redirect('/colleges');
    });
};

var enrollmentHelper = function(unitId, data, row) {

    /*
    Col6 is Total Enrollment
    Col8 is Male Enrollment
    Col10 is Female Enrollment
     */

    College.findOne({UNITID: unitId}, function(err, doc) {

        //doc.enrollment = {
        //    total: data[row][6],
        //    male: data[row][8],
        //    female: data[row][10]
        //};
        doc.enrollment = {
            //'total': [data[row][6]],
            'male': [data[row][8]],
            'female': [data[row][10]]
        };
        //doc.enrollment = undefined;

        doc.save();
    });
};