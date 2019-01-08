const Sequelize = require('sequelize')
const db = require('../db')

const PastOrder = db.define('pastOrders', {
  order: {
    type: Sequelize.ARRAY
  }
})

module.exports = PastOrder
