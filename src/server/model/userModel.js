const Sequelize = require('sequelize');
const pg = require('pg');
const sequelize = new Sequelize('d4qrsh611v83tq', 'nvvdmmyccvxpoc', 'V4aefMOIM1m_PAy2Xx8dcpDC9P', {

  host: 'ec2-54-235-95-102.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: { ssl: true }
});

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.TEXT
  },
  email_address: {
    type: Sequelize.TEXT
  },
  password: {
    type: Sequelize.TEXT
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

sequelize.sync({
  logging: console.log,
  force: true
})

module.exports = User;