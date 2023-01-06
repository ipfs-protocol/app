const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const { sequelize } = require('./dbases/models');

dotenv.config();
const main = require('./routers/amain');
const userRouter = require('./routers/userRouter');
const commentRouter = require('./routers/commentRouter');

const server = express();

server.set('port', process.env.APP_PORT || 3000);
server.set('view engine', 'html');
nunjucks.configure('views', {
  express: server,
  watch: true,
});
sequelize.sync({ force: false})
  .then(() => {
    console.log('데이터 베이스 sequelize 연결')
  })
  .catch((err) => {
    console.error(err);
  });

server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', main);
server.use('/user', userRouter);
server.use('/comment', commentRouter);

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