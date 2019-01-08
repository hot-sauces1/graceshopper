const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})
