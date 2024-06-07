const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'postgres', 
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  logging: false, 
});


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the Sequelize connection when done (if necessary)
    await sequelize.close();
  }
}


module.exports = sequelize;
