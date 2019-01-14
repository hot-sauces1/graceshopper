const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// /api/order

//make considerations for adding userId into this route

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
