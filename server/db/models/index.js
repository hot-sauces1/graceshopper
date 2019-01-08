const User = require('./user')
const Product = require('./product')
const OrderItem = require('./orderItem')
const ActiveOrder = require('./activeOrder')
const PastOrder = require('./pastOrder')

User.hasOne(ActiveOrder)
ActiveOrder.belongsTo(User)

ActiveOrder.hasMany(OrderItem)
OrderItem.belongsTo(ActiveOrder)

module.exports = {
  User,
  Product,
  OrderItem,
  ActiveOrder,
  PastOrder
}
