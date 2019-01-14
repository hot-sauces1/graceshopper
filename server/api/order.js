const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// /api/order
router.post('/cart', async (req, res, next) => {
  try {
    //wondering should we be adding the sessionId to the route in the url and pulling from there

    let addToCart
    if (req.session.passport.user) {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          userId: req.session.passport.user
        }
      }).addProduct(req.body.id)
    } else {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          sessionId: req.sessionid
        }
      }).addProduct(req.body.id)
    }
    res.send(addToCart)
  } catch (error) {
    next(error)
  }
})

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

router.get('/cart', async (req, res, next) => {
  try {
    let activeOrder
    if (req.body.userId) {
      activeOrder = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.userId
        }
      })
    } else {
      activeOrder = await Order.findOne({
        where: {
          isActive: true,
          sessionId: req.session.id
        }
      })
    }
    res.json(activeOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const singleOrder = await Order.findById(
      {
        where: {
          userId: req.body.userId,
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
        where: {userId: req.body.userId}
      },
      {include: [Product]}
    )
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})
