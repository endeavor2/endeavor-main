const Sequelize = require('sequelize');
const pg = require('pg');
const sequelize = new Sequelize('d4qrsh611v83tq', 'nvvdmmyccvxpoc', 'V4aefMOIM1m_PAy2Xx8dcpDC9P', {

  host: 'ec2-54-235-95-102.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: { ssl: true }
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.TEXT
  },
  email_address: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.TEXT
  },
  company: {
    type: Sequelize.TEXT
  },
  bio: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.TEXT
  },
  projects: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
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
  force: false
})

module.exports = User;
