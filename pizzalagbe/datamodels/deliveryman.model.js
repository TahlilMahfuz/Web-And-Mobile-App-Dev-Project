const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); 
const OrderType = require('./ordertypes.model'); 
const Branch = require('./branches.model'); 

const Deliveryman = sequelize.define('deliveryman', {
  deliverymanid: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  typeid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  branchid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  services: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  password: {
    type: DataTypes.STRING(512),
    defaultValue: '123',
  },
  phone: {
    type: DataTypes.STRING(20),
  },
}, {
  tableName: 'deliveryman',
  timestamps: false, 
});

Deliveryman.belongsTo(OrderType, { foreignKey: 'typeid' });
Deliveryman.belongsTo(Branch, { foreignKey: 'branchid' });

Deliveryman.sync({ force: false })
  .then(() => {
    console.log('Deliveryman table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Deliveryman;
