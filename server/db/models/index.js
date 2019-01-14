const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Product, {through: OrderItem})
// Order.hasMany(Product)

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
