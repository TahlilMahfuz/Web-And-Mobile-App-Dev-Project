const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); // Adjust the path based on your actual file location

const OrderType = sequelize.define('OrderType', {
  typeid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'ordertype',
  timestamps: false, // Disable createdAt and updatedAt columns
});

// Create the table
OrderType.sync({ force: false })
  .then(() => {
    console.log('OrderType table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = OrderType;
