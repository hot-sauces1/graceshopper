const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    let activeOrder
    //check if user is logged in as that user id
    if (req.user.id) {
      activeOrder = await Order.findOne(
        {
          where: {
            isActive: true,
            userId: req.user.id,
            sessionId: req.sessionID
          }
        },
        {include: [{model: Product}]}
      )
    } else {
      activeOrder = await Order.findOne(
        {
          where: {
            sessionId: req.sessionID
          }
        },
        {include: [{model: Product}]}
      )
    }
    console.log('activeOrder \n\n\n\n\n\n\n\n', activeOrder)
    res.json(activeOrder)
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

//SEQUELIZE Add Product Issue
router.post('/cart', async (req, res, next) => {
  try {
    let addToCart
    console.log('REQQQQQ\n\n\n\n\n\n\n\n\n\n\n\n', req.session)
    if (req.session.userId) {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          userId: req.session.userId,
          sessionId: req.sessionID
        }
      })
      console.log('addToCart\n\n\n\n\n\n', addToCart)
      //await addToCart.addProducts(req.body.id)
    } else {
      addToCart = await Order.findOrCreate({
        where: {
          isActive: true,
          sessionId: req.sessionID
        }
      })
      console.log('addToCart\n\n\n\n\n\n', addToCart)
      //await addToCart.addProducts(req.body.id)
    }
    res.send(addToCart)
  } catch (error) {
    next(error)
  }
})

// router.post('/cart', (req, res, next) => {
//   return Order.findOrCreate({
//     where: {
//       isActive: true,
//       userId: req.session.userId,
//       sessionId: req.sessionID
//     }
//   }).then(order => {
//     const firstIdx = order[0];
//     console.dir("FIRST", firstIdx)
//     return firstIdx.addProduct(req.body.id)
//   })
// })

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
