require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const auth = require('./routes/auth');
const category = require('./routes/category');
const post = require('./routes/post');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

mongoose.connect('mongodb+srv://kennan:' + process.env.MONGO_ATLAS_PWR + '@cluster0.9akcx.mongodb.net/mean-tutorial-db?retryWrites=true&w=majority', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
