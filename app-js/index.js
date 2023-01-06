const server = require('./src/server');
/*
  npm install --save
  express morgan cookie-parser express-session dotenv nunjucks
  sequelize mysql2

  npm install --save-dev
  nodemon sequelize-cli
*/

server.listen(server.get('port'), () => {
  console.log(`http://localhost:${server.get('port')}`);
});