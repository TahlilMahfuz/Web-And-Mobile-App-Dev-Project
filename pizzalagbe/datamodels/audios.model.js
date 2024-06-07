const { DataTypes } = require('sequelize');
const { sequelize } = require('../your-sequelize-instance'); 
const Order = require('./orders.model');

const Audio = sequelize.define('Audio', {
  audioid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  audioname: {
    type: DataTypes.STRING(100),
  },
});

Audio.belongsTo(Order, { foreignKey: 'orderid' });

module.exports = Audio;
