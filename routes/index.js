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

    user.findOne({email: email, password: password}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        if(!user) {
            return res.status(404).send();
        }

        req.session.user = user;
        return res.status(200).send();
    });
});

router.get('/dashboard', function(req, res) {
    if(!req.session.user) {
        return res.send(401).send();
    }

    return res.status(200).send("You've been logged in");
});

router.post('/register', function(req, res) {
    var newUser = new user();

    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.password = req.body.password;

    newUser.save(function(err, savedUser) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

module.exports = router;