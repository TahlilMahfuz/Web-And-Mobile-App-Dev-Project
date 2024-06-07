const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const customers = sequelize.define('customers', {
  customerid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  customeremail: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  customerphone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  customerpassword: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
}, {
  tableName: 'customers',
  timestamps: false, 
});

// Create the table
customers.sync({ force: false })
  .then(() => {
    console.log('Customers table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = customers;
