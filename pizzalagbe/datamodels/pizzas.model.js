const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); 

const Pizza = sequelize.define('pizzas', {
  pizzaid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pizzaname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING(100),
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  tableName: 'pizzas',
  timestamps: false, 
});


Pizza.sync({ force: false })
  .then(() => {
    console.log('Pizzas table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Pizza;
