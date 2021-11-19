const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const middleware = require('./middleware');

const indexRouter = require('./routes');
const recipesRouter = require('./routes/recipes');

const app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(middleware)
app.use('/recipes', recipesRouter);


module.exports = app;
