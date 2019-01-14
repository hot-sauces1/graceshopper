const User = require('./user')
const Product = require('./product')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {through: 'order/product'})
Order.belongsToMany(Product, {through: 'order/product'})

module.exports = {
  User,
  Product,
  Order
}
