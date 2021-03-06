require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');
var carsRouter = require('./routes/cars');
var accountRouter = require('./routes/account');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

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

app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/cars', carsRouter);
app.use('/account', accountRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.locals({
        yandexApiKey: process.env.YANDEX_API_KEY,
        session: req.session
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
