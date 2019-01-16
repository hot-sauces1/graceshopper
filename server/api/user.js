const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.post('/cart', async (req, res, next) => {
  try {
    let checkIfOrder = await Order.findOrCreate({
      where: {
        isActive: true,
        sessionId: req.sessionID
      }
    })
    let targetProduct = await Product.findById(req.body.id)
    let order = await checkIfOrder[0].addProduct(targetProduct)
    await checkIfOrder[0].save()
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    let activeOrder = await Order.findOrCreate({
      where: {
        isActive: true,
        sessionId: req.sessionID
      },
      include: [Product]
    })
    res.json([activeOrder[0]])
  } catch (err) {
    next(err)
  }
})

router.delete('/cart', async (req, res, next) => {
  try {
    let removeToCart
    if (req.session.userId) {
      removeToCart = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.userId
        }
      }).removeProduct(req.body.id)
    } else {
      removeToCart = await Order.findOne({
        where: {
          isActive: true,
          sessionId: req.sessionID
        }
      }).removeProduct(req.body.id)
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.session.passport.user === Number(req.params.id)) {
      const singleUser = await User.findById(req.params.id)
      res.json(singleUser)
    } else {
      throw new Error('Go away hacker!')
    }
  } catch (err) {
    next(err)
  }
})
