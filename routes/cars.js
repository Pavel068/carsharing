var express = require('express');
var router = express.Router();

/* GET cars listing. */
router.get('/', function(req, res, next) {
    res.render('cars', {
        active: '/cars'
    });
});

/* GET car details */
router.get('/:carId', function(req, res, next) {
    res.render('car-details', {
        active: '/cars',
        data: {},
    });
});

module.exports = router;
