const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// /api/product
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
