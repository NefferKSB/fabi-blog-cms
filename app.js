require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const postRouter = require('./routes/post');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(passport.initialize());

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

//Disable CORs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/public', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/post', postRouter);

module.exports = app;
