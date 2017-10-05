var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Pasale Dai' });
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.findOne({ email: email }, function(err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        if (!user) {
            return res.sendStatus(404);
        }

        // test for matching password
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch && isMatch == true) {
                req.session.user = user;
                return res.sendStatus(200);
            } else {
                return res.sendStatus(401);
            }
        });
    });
});

router.get('/dashboard', function(req, res) {
    if (!req.session.user) {
        return res.sendStatus(401);
    }

    return res.status(200).send("You've been logged in");
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
});

router.post('/register', function(req, res) {
    var newUser = new user();

    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.password = req.body.password;

    newUser.save(function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
});

module.exports = router;