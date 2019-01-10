const User = require('./user')
const Product = require('./product')
const OrderItem = require('./orderItem')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

User.hasMany(OrderItem)
OrderItem.belongsTo(User)

module.exports = {
  User,
  Product,
  OrderItem,
  Order
}
