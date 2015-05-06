var assert = require('assert');
var express = require('express');
var request = require('supertest');

var collegeController = require('../controllers/collegeController');
var uploadController = require('../controllers/uploadController');

var app = require('../app');
var agent = request.agent(app);


describe('Controllers', function() {
    describe('College Controller', function() {
        it('should have Function index', function() {
            assert.equal(typeof collegeController.index, 'function');
        });

        it('should have Function getCollegeById', function() {
            assert.equal(typeof collegeController.getCollegeById, 'function');
        });

        it('should have Function getEnrollmentData', function() {
            assert.equal(typeof collegeController.getEnrollmentData, 'function');
        });

        it('should have Function getTuitionData', function() {
            assert.equal(typeof collegeController.getTuitionData, 'function');
        });

        it('should have Function getTopenrollData', function() {
            assert.equal(typeof collegeController.getTopenrollData, 'function');
        });
    });
    
    describe('Upload Controller', function() {
        it('should have Function index', function() {
            assert.equal(typeof uploadController.index, 'function');
        });

        it('should have Function parseCSV', function() {
            assert.equal(typeof uploadController.parseCSV, 'function');
        });

        it('should have Function collegeData', function() {
            assert.equal(typeof uploadController.collegeData, 'function');
        });

        it('should have Function enrollmentData', function() {
            assert.equal(typeof uploadController.enrollmentData, 'function');
        });

        it('should have Function tuitionData', function() {
            assert.equal(typeof uploadController.tuitionData, 'function');
        });
    });
});

describe('Routes', function() {
    describe('GET /', function() {
        it('should respond with StatusCode 302 (redirect)', function(done) {
            request(app).get('/').expect(302, done);
        });

        it('should redirect to /colleges (assuming data is in db)', function(done) {
            agent
                .get('/')
                .expect('Location', '/colleges')
                .end(done)
        })
    });

    describe('GET /colleges', function() {
        it('should respond with StatusCode 200', function(done) {
            request(app).get('/colleges').expect(200, done);
        })
    });

    describe('GET /upload', function() {
        it('should respond with StatusCode 200', function(done) {
            request(app).get('/upload').expect(200, done);
        })
    });

    describe('GET /topenroll', function() {
        it('should respond with StatusCode 200', function(done) {
            request(app).get('/topenroll').expect(200, done);
        })
    });

    describe('GET /topenroll/topenrollment', function() {
        it('should respond with StatusCode 200', function(done) {
            request(app).get('/topenroll/topenrollment').expect(200, done);
        })
    });
});
