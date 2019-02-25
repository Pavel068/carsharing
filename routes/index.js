var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    active: '/'
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    active: '/login'
  });
});

module.exports = router;
