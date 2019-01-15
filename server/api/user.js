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
    // let odId = checkIfOrder[0].dataValues.id
    // console.log("checkiforder\n\n", checkIfOrder[0])
    let targetProduct = await Product.findById(req.body.id)
    let order = await checkIfOrder[0].addProduct(targetProduct)
    await checkIfOrder[0].save()
    // let order = await OrderItem.create({
    //     price: 0,
    //     quantity: 1,
    //     productId: req.body.id,
    //     orderId: odId
    // })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    let activeOrder = await Order.findOne({
      where: {
        isActive: true,
        sessionId: req.sessionID
      },
      include: [Product]
    })
    console.log('Active ORder \n\n', activeOrder)
    res.json(activeOrder)
  } catch (err) {
    next(err)
  }
})

//SEQUELIZE Add Product Issue
// router.post('/cart', async (req, res, next) => {
//   try {
//     let addToCart
//     console.log('REQQQQQ\n\n\n\n\n\n\n\n\n\n\n\n', req.session)
//     if (req.session.userId) {
//       addToCart = await Order.findOrCreate({
//         where: {
//           isActive: true,
//           userId: req.session.userId,
//           sessionId: req.sessionID
//         }
//       })
//       console.log('addToCart\n\n\n\n\n\n', addToCart)
//       //await addToCart.addProducts(req.body.id)
//     } else {
//       addToCart = await Order.findOrCreate({
//         where: {
//           isActive: true,
//           sessionId: req.sessionID
//         }
//       })
//       console.log('addToCart\n\n\n\n\n\n', addToCart)
//       //await addToCart.addProducts(req.body.id)
//     }
//     res.send(addToCart)
//   } catch (error) {
//     next(error)
//   }
// })

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
