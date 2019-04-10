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

module.exports = router;