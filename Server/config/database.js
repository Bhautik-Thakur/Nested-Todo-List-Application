
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to MySQL:', error);
  });

module.exports = sequelize;