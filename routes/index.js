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

        return res.status(200).send();
    });
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