const Sequelize = require('sequelize')
const db = require('../db')

const ActiveOrder = db.define('activeOrders', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  }
})

module.exports = ActiveOrder
