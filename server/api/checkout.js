const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// /api/chekout

router.put('/', async (req, res, next) => {
  try {
    let checkedOut
    if (req.body.id) {
      checkedOut = await Order.findOne({
        where: {
          isActive: true,
          userId: req.body.id
        }
      })
    } else {
      checkedOut = await Order.findOne({
        where: {
          isActive: true,
          sessionId: req.session.id
        }
      })
    }
    const updateAction = await checkedOut.update({
      isActive: false
    })
    res.status(200).send(updateAction)
  } catch (error) {
    next(error)
  }
})
