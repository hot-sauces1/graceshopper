const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItems', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

OrderItem.prototype.increase = function() {
  ++this.quantity
}

OrderItem.prototype.decrease = function() {
  --this.quantity
}

module.exports = OrderItem
