const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  console.log('REQ', req.params.id, req.body.userId)
  try {
    //is logged in as that user
    if (req.body.userId === Number(req.params.id)) {
      const singleUser = await User.findById(req.params.id)
      res.json(singleUser)
    } else {
      throw new Error('Go away hacker!')
    }
  } catch (err) {
    console.log('Go away hacker!')
    next(err)
  }
})

router.get('/:id/cart', async (req, res, next) => {
  try {
    let activeOrder
    console.log('Session \n\n\n\n\n\n', reqUser, 'REQ\n\n\n\n\n', req.sessionID)
    //check if user is logged in as that user id
    if (req.body.userId === Number(req.params.id)) {
      activeOrder = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.userId
        }
      })
    } else if (req.session.id === req.sessionId) {
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
  //throw to specific styled page
  //should we use toast
  //if not throw permission error
  //if true
  //query cart data
  //render cart component
})
