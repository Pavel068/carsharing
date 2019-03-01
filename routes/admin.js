const express = require('express');
const router = express.Router();

const db = new (require('../lib/db'))();
const car = new (require('../lib/car'))(db);

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
    car.addCar(req.body)
        .then((response) => {
            res.redirect('/admin');
        })
        .catch((error) => {
            console.log(error);
            res.send('Error');
        });
});

module.exports = router;
