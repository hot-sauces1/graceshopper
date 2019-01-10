const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

// /api/order
router.post('/cart/:userId', async (req, res, next) => {
  try {
    //wondering should we be adding the sessionId to the route in the url and pulling from there
    const addToCart = await OrderItem.create({
      //do we need to set-up the ability to do cookies
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity,
      userId: req.params.userId
    })

    res.send(addToCart)
  } catch (error) {
    next(error)
  }
})

//make considerations for adding userId into this route
router.delete('/cart/:id', async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

//make considerations for adding userId into this route
router.put('/cart/:id', async (req, res, next) => {
  try {
    //let's think of a better way to capture id --> maybe might have to be itemId
    const updateItem = await OrderItem.findById(req.params.id)
    const updateAction = await updateItem.update(req.body)
    res.status(200).send('Successfully updated cart!', updateAction)
  } catch (error) {
    next(error)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const activeOrder = await Order.findOne({
      where: {isActive: true},
      include: [OrderItem]
    })
    res.json(activeOrder)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findById(req.params.id, {
      include: [OrderItem]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})
