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
    if (req.files !== undefined) {
        // req.body.avatar = 'a_' +
        // req.files.avatar.mv('/public/images/a_' + req.files.avatar.md5 + '.' + req.files.avatar)
        console.log(req.files);
    }
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