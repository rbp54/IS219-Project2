var express = require('express');
var router = express.Router();
var College = require('../model/college');

/* GET home page. */
router.get('/', function(req, res, next) {

    College.count({}, function(err, count) {
        if (count == 0) {
            res.redirect('/upload');
        } else {
            res.redirect('/colleges');
        }
    });
    //res.render('index', { title: 'Express' });
});

//homepage stuff

module.exports = router;
