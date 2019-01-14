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
    //before final commits please revist this topic per pascha re:  price integer and moving to penny system
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
