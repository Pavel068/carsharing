const express = require('express');
const router = express.Router();

const db = new (require('../lib/db'))();
const car = new (require('../lib/car'))(db);
const chat = new (require('../lib/chat'))(db);

var redis = require("redis"),
    redisClient = redis.createClient();

router.get('/', function (req, res, next) {
    res.send('OK');
});

router.get('/trips', function (req, res, next) {
    res.send('OK');
});

router.get('/trips/:tripId', function (req, res, next) {
    res.send('OK');
});

router.get('/cars', function (req, res, next) {
    car.getCarsList()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        })
});

router.get('/cars/:carId', function (req, res, next) {
    car.getCarInfo(req.params.carId)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get('/chat/:chatId', function (req, res, next) {
    chat.getMessages()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post('/chat/', function (req, res, next) {
    chat.sendMessage(0, req.body.msg)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

module.exports = router;