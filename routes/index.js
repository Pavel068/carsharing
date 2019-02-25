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

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    active: '/register'
  });
});

module.exports = router;
