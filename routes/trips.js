var express = require('express');
var router = express.Router();

/* GET trips listing. */
router.get('/', function(req, res, next) {
    res.render('trips', {
        active: '/trips'
    });
});

/* GET trip details */
router.get('/:tripId', function(req, res, next) {
    res.render('trip-details', {
        active: '/trips',
        data: {},
    });
});

module.exports = router;
