const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

// /api/order
router.get('/cart', async (req, res, next) => {
  try {
    const activeOrder = await Order.findOne({
      where: {isActive: true},
      include: [OrderItem]
    })
    res.json(activeOrder)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findById(req.params.id, {
      include: [OrderItem]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})
