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

//gettiing male&female data from enrollment adding them up 
//and usig that as total enrollment data for top 10 enrolled College 

exports.getTopenrollData = function(req, res, next) {

    College.find({} ,'enrollment INSTNM', function(err, doc) {

        if (err) {
             console.log('err', err);
        } else  if(doc){
            //res.send(doc)
            var topObj={}
             for(var i=0; i < doc.length; i++){
                 if (doc[i].enrollment) {
                     if(doc[i].enrollment.male && doc[i].enrollment.female){
                         topObj[doc[i].INSTNM] =  Number(doc[i].enrollment.male) + Number(doc[i].enrollment.female)
                     }              
                 };
             };

            var topenrollArray=[];
            
            for(var key in topObj){
                var tempObj = {}
                tempObj[key] = topObj[key];

                topenrollArray.push({
                    name: key,
                    enroll: topObj[key]
                })
            }
           
            
            topenrollArray.sort(function(a, b) {
                return b.enroll-a.enroll;
            } );
            //res.send(topenrollArray);
            
            var topTenArray = topenrollArray.slice(0, 10);


            var topTenObj = {};
            for (var i = 0; i < topTenArray.length; i++) {
                topTenObj[topTenArray[i].name] = topTenArray[i].enroll;
            }
            
            
            res.send(topTenObj)
           
        }else{
             res.send('This college does not have enrollment data');
             res.end();
         }

    });
};