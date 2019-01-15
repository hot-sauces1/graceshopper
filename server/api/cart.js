const router = require('express').Router()
const {Order, Product} = require('../db/models')
const findActiveCart = require('../utils/findActiveCart')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const getCart = await Order.findOne({
      where: {isActive: true, userId: 1}
    })
    res.json(getCart)
  } catch (err) {
    next(err)
  }
})
