const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); 
const Order = require('./orders.model'); 
const Pizza = require('./pizzas.model'); 
const Topping = require('./toppings.model'); 

const OrderPizzaTopping = sequelize.define('OrderPizzaTopping', {
  orderid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pizzaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toppingid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'orderpizzatopping',
  timestamps: false, 
  primaryKey: {
    name: 'pk_orderpizzatopping',
    fields: ['orderid', 'pizzaid', 'toppingid'],
  },
});

OrderPizzaTopping.belongsTo(Order, { foreignKey: 'orderid' });
OrderPizzaTopping.belongsTo(Pizza, { foreignKey: 'pizzaid' });
OrderPizzaTopping.belongsTo(Topping, { foreignKey: 'toppingid' });

OrderPizzaTopping.sync({ force: false })
  .then(() => {
    console.log('OrderPizzaTopping table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = OrderPizzaTopping;
