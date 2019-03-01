var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var redis = require("redis");
var redisClient = redis.createClient();

var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');
var carsRouter = require('./routes/cars');
var adminRouter = require('./routes/admin');

var app = express();

const db = new (require('./lib/db'))();
user = new (require('./lib/user'))(db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client: redisClient
    }),
    secret: 'whatisthis',
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/cars', carsRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    res.locals({
        yandexApiKey: process.env.YANDEX_API_KEY
    });
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
