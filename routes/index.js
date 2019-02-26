var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    active: '/',
    breadcrumbs: [
      {
        'label': 'Главная',
        'href': '/'
      },
    ],
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    active: '/login',
    breadcrumbs: [
      {
        'label': 'Авторизация',
        'href': '/login'
      },
    ],
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    active: '/register',
    breadcrumbs: [
      {
        'label': 'Регистрация',
        'href': '/register'
      },
    ],
  });
});

module.exports = router;
