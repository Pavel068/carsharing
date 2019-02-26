var express = require('express');
var router = express.Router();

/* GET trips listing. */
router.get('/', function(req, res, next) {
    res.render('trips', {
        active: '/trips',
        breadcrumbs: [
            {
                'label': 'Мои поездки',
                'href': '/trips'
            },
        ],
    });
});

/* GET trip details */
router.get('/:tripId', function(req, res, next) {
    res.render('trip-details', {
        active: '/trips',
        breadcrumbs: [
            {
                'label': 'Мои поездки',
                'href': '/trips'
            },
            {
                'label': req.params.tripId,
                'href': '/trips/' + req.params.carId
            },
        ],
        data: {},
    });
});

module.exports = router;
