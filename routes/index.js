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
    user.register(req.body);
});

module.exports = router;
