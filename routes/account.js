var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('account', {
        user: user,
        active: '/account',
        breadcrumbs: [
            {
                'label': 'Аккаунт',
                'href': '/account'
            },
        ],
    });
});

router.get('/edit', function (req, res, next) {
    res.render('edit-account', {
        user: user,
        active: '/account',
        breadcrumbs: [
            {
                'label': 'Аккаунт',
                'href': '/account'
            },
            {
                'label': 'Редактировать данные',
                'href': '/account/edit'
            },
        ],
    });
});

module.exports = router;