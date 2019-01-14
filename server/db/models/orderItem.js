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
  console.log('increasing \n\n\n', this.quantity)
  ++this.quantity
}

module.exports = OrderItem
