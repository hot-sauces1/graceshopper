const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// /api/order

//make considerations for adding userId into this route

router.delete('/cart', async (req, res, next) => {
  try {
    let removeToCart
    if (req.body.userId) {
      removeToCart = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.userId
        }
      })
      await removeToCart.removeProduct(req.body.id)
    } else {
      removeToCart = await Order.findOne({
        where: {
          isActive: true,
          sessionId: req.session.id
        }
      }).removeProduct(req.body.id)
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne(
      {
        where: {
          userId: req.session.passport.user,
          id: req.body.id
        }
      },
      {include: [Product]}
    )
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll(
      {
        where: {userId: req.session.passport.user}
      },
      {include: [Product]}
    )
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})
