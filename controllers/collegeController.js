var College = require('../model/college');

exports.index = function(req, res, next) {
    College.find({}).select('_id INSTNM').lean().exec(function(err, colleges) {
        if (err) {
            console.log('err', err);
        } else {
            res.render('collegelist', {
                colleges: colleges
            });
        }
    });
};

exports.getCollegeById = function(req, res, next) {
    var id = req.params.id;

    // lean turns 'college' from mongoose document to a javascript object
    // better for read only scenarios
    College.findOne({_id: id}).lean().exec(function(err, college) {
        if (err) {
            console.log('err', err);
        } else {
            if (!college) {
                res.send('_id: ' + id + ' not found in db.');
                res.end();
            } else {
                delete college._id;
                delete college.__v;

                res.render('college', {
                    college: college
                })
            }
        }
    });
};

exports.getEnrollmentData = function(req, res, next) {
    var id = req.params.id;

    College.findOne({_id: id}, 'enrollment', function(err, doc) {
        if (err) {
            console.log('err', err);
        } else {
            if (doc.enrollment) {
                res.send(doc.enrollment);
            } else {
                res.send('This college does not have enrollment data');
                res.end();
            }
        }
    });
};

exports.getTuitionData = function(req, res, next) {
    var id = req.params.id;

    College.findOne({_id: id}, 'tuition', function(err, doc) {
        if (err) {
            console.log('err', err);
        } else {
            if (doc.tuition && doc.tuition.length != 0) {
                res.send({
                    tuition: doc.tuition
                });
            } else {
                res.send('This college does not have tuition data');
                res.end();
            }
        }
    });
};