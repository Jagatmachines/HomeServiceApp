var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('partner', { title: 'Pasale Dai' });
});

module.exports = router;
