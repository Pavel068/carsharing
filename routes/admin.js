const express = require('express');
const router = express.Router();

/* GET home admin page. */
router.get('/', function (req, res, next) {
    if (user.info.id === undefined || user.info.is_admin !== 1) {
        res.redirect('/login');
    } else {
        res.render('admin', {
            active: '/admin',
            user: user,
            breadcrumbs: [
                {
                    'label': 'Администрирование',
                    'href': '/admin'
                },
            ],
        });
    }
});

/* Add new car */
router.post('/cars', (req, res, next) => {

});

module.exports = router;
