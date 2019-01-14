const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    let activeOrder
    //check if user is logged in as that user id
    if (req.session.passport.user) {
      activeOrder = await Order.findOne(
        {
          where: {
            isActive: true,
            userId: req.session.passport.user,
            sessionId: req.session.id
          }
        },
        {include: [{model: Product}]}
      )
    } else {
      activeOrder = await Order.findOne(
        {
          where: {
            sessionId: req.session.id
          }
        },
        {include: [{model: Product}]}
      )
    }
    res.send(activeOrder)
  } catch (err) {
    next(err)
  }
  //throw to specific styled page
  //should we use toast
  //if not throw permission error
  //if true
  //query cart data
  //render cart component
})

router.post('/cart', async (req, res, next) => {
  try {
    let addToCart
    if (req.session.passport.user) {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          userId: req.session.passport.user,
          sessionId: req.session.id
        }
      }).addProduct(req.body.id)
    } else {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          sessionId: req.session.id
        }
      }).addProduct(req.body.id)
    }
    res.send(addToCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart', async (req, res, next) => {
  try {
    let removeToCart
    if (req.session.passport.user) {
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
          sessionId: req.session.id
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
