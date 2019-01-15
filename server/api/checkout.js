const router = require('express').Router()
const {Order} = require('../db/models')
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

    const products = await checkedOut.getProducts()

    await Promise.all(
      products.map(async product => {
        try {
          product.orderItems.price = product.price * product.orderItems.quantity
          checkedOut.total += product.orderItems.price

          await product.save()
          await product.orderItems.save()
        } catch (err) {
          console.error(err)
        }
      })
    )

    checkedOut.isActive = false
    await checkedOut.save()

    res.status(200).send(checkedOut)
  } catch (error) {
    next(error)
  }
})
