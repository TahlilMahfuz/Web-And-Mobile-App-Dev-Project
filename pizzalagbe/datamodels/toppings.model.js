const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); // Adjust the path based on your actual file location

const Topping = sequelize.define('toppings', {
  toppingid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  toppingname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING(200),
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  tableName: 'toppings',
  timestamps: false, // Disable createdAt and updatedAt columns
});

// Create the table
Topping.sync({ force: false })
  .then(() => {
    console.log('Toppings table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Topping;
