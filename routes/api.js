var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('OK');
});

router.get('/trips', function (req, res, next) {
    res.send('OK');
});

router.get('/trips/:tripId', function (req, res, next) {
    res.send('OK');
});

router.get('/cars/:carId', function (req, res, next) {
    res.send('OK');
});