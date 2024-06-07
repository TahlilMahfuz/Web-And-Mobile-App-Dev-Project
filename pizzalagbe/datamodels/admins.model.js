const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); // Adjust the path based on your actual file location
const Branch = require('./branches.model'); // Assuming you have a Branch model defined

const Admin = sequelize.define('admins', {
  adminid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  branchid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Branch,
      key: 'branchid',
    },
  },
  adminname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  adminemail: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  adminphone: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  adminpassword: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  reg_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
    tableName: 'admins',
  timestamps: false,
});

Admin.belongsTo(Branch, { foreignKey: 'branchid' });


Admin.sync({ force: false })
  .then(() => {
    console.log('Admin table Initialized');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Admin;
