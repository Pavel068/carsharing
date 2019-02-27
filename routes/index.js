const express = require('express');
const router = express.Router();

const db = new (require('../lib/db'))();
const user = new (require('../lib/user'))(db);

/* GET home page. */
router.get('/', function (req, res, next) {
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
router.get('/login', function (req, res, next) {
    res.render('login', {
        user: user,
        active: '/login',
        breadcrumbs: [
            {
                'label': 'Авторизация',
                'href': '/login'
            },
        ],
    });
});

/* Login user */
router.post('/login', (req, res, next) => {
    user.login(req.body.login, req.body.password)
        .then((response) => {
            if (Object.keys(user.info).length) {
                res.cookie.user = user.info;
                res.redirect('/');
            } else {
                user.info.error = {
                    type: 'login'
                };
                res.redirect('/login');
            }
        })
        .catch((error) => {
            res.send(error);
        })
});

/* GET register page. */
router.get('/register', function (req, res, next) {
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

/* Add user */
router.post('/register', (req, res, next) => {
    user.register(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
