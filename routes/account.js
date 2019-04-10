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

router.post('/edit/info', function (req, res, next) {
    user.saveUserInfo(req.body)
        .then(response => {
            console.log(response);
            res.redirect('/account');
        })
        .catch(error => {
            console.log(error);
        });
});

router.post('/edit/password', function (req, res, next) {

});

router.post('/edit/account', function (req, res, next) {

});

module.exports = router;