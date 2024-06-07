const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Branch = sequelize.define('branches', {
  branchid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  branchname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'branches',
  timestamps: false,
});

// Create the table
Branch.sync({ force: false })
  .then(() => {
    console.log('Branch table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Branch;
