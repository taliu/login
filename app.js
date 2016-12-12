'use strict'
require('./strateties')
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan')
const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.load({ path: '.env' });

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'abc123ddd',
}));
app.use(passport.initialize());
app.use(passport.session())

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash')
app.use(express.static(path.join(__dirname, 'static'), { maxAge: 31557600000 }));

app.use('/api',require('./api'))
app.use('/web',require('./web'))


app.listen(app.get('port'), function () {
    console.log('website running at http://127.0.0.1:'+app.get('port'));
})
