var fs = require('fs');
var csvParser = require('csv-parse');
var College = require('../model/college');

exports.index = function(req, res, next) {
    res.render('upload');
};

exports.parseCSV = function(req, res, next) {

    /* CSV file parser*/
    if (!req.files.myFile) {
        res.send('No file uploaded');
        return;
    }

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
    res.redirect('/colleges');
};

exports.enrollmentData = function(req, res, next) {
    var data = req.parsedData;
    var numRows = data.length;

    /*
    Row0 is header row
    Col0 is UnitID
     */

    for (var row = 1; row < numRows; row++) {
        var unitId = data[row][0];

        enrollmentHelper(unitId, data, row);
    }

    res.redirect('/colleges');
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

exports.tuitionData = function(req, res, next) {
    var data = req.parsedData;
    var numRows = data.length;
    var filename = req.files.myFile.originalname;
    var year;


    if (filename.indexOf('2013') != -1) {
        year = 2013;
    } else if (filename.indexOf('2012') != -1) {
        year = 2012;
    } else if (filename.indexOf('2011') != -1) {
        year = 2011;
    }

    console.log(year);

    /*
     Row0 is header row
     Col0 is UnitID
     */

    for (var row = 1; row < numRows; row++) {
        var unitId = data[row][0];

        tuitionHelper(unitId, data, row, year);
    }
    res.redirect('/colleges');
};

var tuitionHelper = function(unitId, data, row, year) {
    /*
     Col6 is Total Enrollment
     Col8 is Male Enrollment
     Col10 is Female Enrollment
     */

    College.findOne({UNITID: unitId}, function(err, doc) {
        if (doc) {

            if (isNaN(data[row][1])) {
                return;
            }

            if (!doc.tuition) {
                doc.tuition = [];
            }

            doc.tuition.push(Number(data[row][1]));
            doc.save();
        } else {
            console.log('unitId:', unitId, "doesn't exist in db.")
        }
    });
};