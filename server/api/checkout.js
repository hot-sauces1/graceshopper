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

    //assign the price * quantity to OrderItem
    await Promise.all(
      products.forEach(async prod => {
        const item = await OrderItem.findOne({
          where: {productId: prod.id, orderId: req.body.id}
        })
        item.price = prod.price * item.quantity
        checkedOut.total += item.price
      })
    )

    const updateAction = await checkedOut.update({
      isActive: false
    })
    res.status(200).send(updateAction)
  } catch (error) {
    next(error)
  }
})
