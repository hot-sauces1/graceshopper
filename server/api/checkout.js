const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

// /api/chekout

router.put('/', async (req, res, next) => {
  try {
    let checkedOut
    if (req.body.id) {
      checkedOut = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.id
        }
      })
    } else {
      checkedOut = await Order.findOne({
        where: {
          isActive: true,
          sessionId: req.sessionID
        }
      })
    }
    // get all products prices && quantities
    const products = await checkedOut.getProducts()
    // [individual prices]

    const updateAction = await checkedOut.update({
      isActive: false
    })

    await Promise.all(
      products.map(async product => {
        try {
          let item = await OrderItem.findOne({
            where: {productId: product.id, orderId: req.body.id}
          })

          let itemPrice = product.price * item.quantity
          await item.update({price: itemPrice})
          let total = checkedOut.total + item.price
          await checkedOut.update({total: total})

          // console.log('prod :: ', product.name)
          // console.log('price :: ', product.price)
          // console.log('quantity :: ', item.quantity)
          // console.log('total price for item :: ', item.price)
          // console.log('total price for order :: ', checkedOut.total)
        } catch (err) {
          console.error(err)
        }
      })
    )

    res.status(200).send(updateAction)
  } catch (error) {
    next(error)
  }
})
