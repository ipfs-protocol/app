const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

dotenv.config();
const main = require('./routers/amain');

const server = express();

server.set('port', process.env.APP_PORT || 3000);

server.use('/', main);

server.use((req, res, next) => {
  console.log(` 없습니다. ${req.method} ${req.url}`);
  // const error = new Error('nothing');
  // error.status = 404;
  // next(error)
});

server.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;