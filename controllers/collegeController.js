var mongoose = require('mongoose'),
    db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var College = require('../model/college');

var onErr = function(err,callback) {
    mongoose.connection.close();
    callback(err);
};

exports.index = function(req, res, next) {
    mongoose.connect('mongodb://localhost/colleges');

    db.once('open', function() {
        College.find({}).select('_id INSTNM').lean().exec(function(err, colleges) {
            if (err) {
                console.log('err', err);
                onErr(err);
            } else {
                mongoose.connection.close();

                res.render('collegelist', {
                    colleges: colleges
                });
            }
        });
    });
};

exports.getCollegeById = function(req, res, next) {
    var id = req.params.id;

    mongoose.connect('mongodb://localhost/colleges');

    db.once('open', function() {

        // lean turns 'college' from mongoose document to a javascript object
        // better for read only scenarios
        College.findOne({_id: id}).lean().exec(function(err, college) {
            if (err) {
                console.log('err', err);
                onErr(err);
            } else {
                mongoose.connection.close();

                delete college._id;
                delete college.__v;

                res.render('college', {
                    college: college
                })
            }
        });
    })
};

exports.getEnrollmentData = function(req, res, next) {
    var id = req.params.id;
    mongoose.connect('mongodb://localhost/colleges');

    db.once('open', function() {
        College.findOne({_id: id}, 'enrollment', function(err, doc) {
            if (err) {
                onErr(err);
            } else {
                mongoose.connection.close();
                //console.log(doc.enrollment);
                if (doc.enrollment) {
                    res.send(doc.enrollment);
                } else {
                    console.log('This college does not have enrollment data');
                }
            }

        })
    });
};
