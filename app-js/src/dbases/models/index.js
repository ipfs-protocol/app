'use strict';
const path = require('path');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: path.join(__dirname, "../..", "config", ".env") });

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
  { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
