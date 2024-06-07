const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); 
const Customer = require('./customers.model'); 
const Deliveryman = require('./deliveryman.model'); 
const OrderType = require('./ordertypes.model');
const Branch = require('./branches.model');

const Order = sequelize.define('orders', {
  orderid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliverymanid: {
    type: DataTypes.STRING(20),
  },
  typeid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
  },
  address: {
    type: DataTypes.STRING(100),
  },
  branchid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 1,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.DOUBLE,
  },
  comment: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: 'orders',
  timestamps: false, 
});

Order.belongsTo(Customer, { foreignKey: 'customerid' });
Order.belongsTo(Deliveryman, { foreignKey: 'deliverymanid' });
Order.belongsTo(OrderType, { foreignKey: 'typeid' });
Order.belongsTo(Branch, { foreignKey: 'branchid' });


Order.sync({ force: false })
  .then(() => {
    console.log('Orders table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Order;
