const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  sessionId: {
    type: Sequelize.TEXT
  },
  userId: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
