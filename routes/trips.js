var express = require('express');
var router = express.Router();

/* GET trips listing. */
router.get('/', function(req, res, next) {
    res.render('trips', {
        active: '/trips'
    });
});

module.exports = router;
