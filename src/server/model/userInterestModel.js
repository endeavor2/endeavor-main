'use strict'
const Sequelize = require('sequelize');
const pg = require('pg');
const sequelize = new Sequelize('d4qrsh611v83tq', 'nvvdmmyccvxpoc', 'V4aefMOIM1m_PAy2Xx8dcpDC9P', {

  host: 'ec2-54-235-95-102.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: { ssl: true }
});

const User_Interest = sequelize.define('user_interest', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  interest_id: {
    type: Sequelize.INTEGER
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

module.exports = User_Interest;