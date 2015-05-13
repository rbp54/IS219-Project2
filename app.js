var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var csvParser = require('csv-parse');
var requirejs = require('requirejs');

var routes = require('./routes/index');
var colleges = require('./controllers/collegeController');
var uploads = require('./controllers/uploadController');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer());

app.get('/', routes);
app.get('/colleges', colleges.index);
app.get('/colleges/:id', colleges.getCollegeById);
app.get('/colleges/:id/enrollment', colleges.getEnrollmentData);
app.get('/colleges/:id/tuition', colleges.getTuitionData);

app.get('/upload', uploads.index);

app.get('/topenroll', function(req, res) {
    res.render('topenroll');
});
app.get('/topenroll/topenrollment', colleges.getTopenrollData);

//5/10 QUnit
app.get('/qunit', function(req, res) {
    res.render('qunit');
});



app.post('/uploads/collegeData', uploads.parseCSV, uploads.collegeData);
app.post('/uploads/enrollmentData', uploads.parseCSV, uploads.enrollmentData);
app.post('/uploads/tuitionData', uploads.parseCSV, uploads.tuitionData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


mongoose.connect('mongodb://localhost/colleges');

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Project2 listening at http://%s:%s', host, port)
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = app;
