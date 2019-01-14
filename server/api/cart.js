const router = require('express').Router()
const {Order, Product} = require('../db/models')
const findActiveCart = require('../utils/findActiveCart')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.user)
  try {
    const {getCart} = await Order.findAll({
      where: findActiveCart(req.user, req.session)
    })
    console.log('GETCART', getCart)
    res.json(getCart)
  } catch (err) {
    next(err)
  }
})