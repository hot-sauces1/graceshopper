const router = require('express').Router()
const session = require('express-session')
module.exports = router

router.use('/user', require('./user'))
router.use('/product', require('./product'))
router.use('/order', require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
