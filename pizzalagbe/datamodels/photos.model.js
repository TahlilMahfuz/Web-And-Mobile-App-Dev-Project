const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelizeConfig');
const Customer = require('./customers.model'); 

const Photo = sequelize.define('photos', {
  photoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photoname: {
    type: DataTypes.STRING(100),
  },
});

Photo.belongsTo(Customer, { foreignKey: 'customerid' });

module.exports = Photo;
