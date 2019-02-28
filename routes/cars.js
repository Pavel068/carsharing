var express = require('express');
var router = express.Router();

/* GET cars listing. */
router.get('/', function (req, res, next) {
    res.render('cars', {
        active: '/cars',
        user: user,
        breadcrumbs: [
            {
                'label': 'Автомобили',
                'href': '/cars'
            },
        ],
    });
});

/* GET car details */
router.get('/:carId', function (req, res, next) {
    res.render('car-details', {
        active: '/cars',
        user: user,
        breadcrumbs: [
            {
                'label': 'Автомобили',
                'href': '/cars'
            },
            {
                'label': req.params.carId,
                'href': '/cars/' + req.params.carId
            },
        ],
        data: {},
    });
});

module.exports = router;
