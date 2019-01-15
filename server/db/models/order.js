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
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

// Order.hook('beforeSave', async instance => {
//   if (instance.isActive === false) {
//     const products = await instance.getProducts()

//     await Promise.all(
//       products.map(async product => {
//         try {
//           product.orderItems.price = product.price * product.orderItems.quantity
//           instance.total += product.orderItems.price

//           await product.save()
//           await product.orderItems.save()
//         } catch (err) {
//           console.error(err)
//         }
//       })
//     )
//     await instance.save()
//   }
// })
module.exports = Order
