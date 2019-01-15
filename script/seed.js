'use strict'

const db = require('../server/db')
const {User, Order, Product, OrderItem} = require('../server/db/models/index')

const users = require('../mock_data/users')
const products = require('../mock_data/products')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(products.map(product => Product.create(product)))

  await Order.create()
  const order = await Order.findById(1)
  let allProducts = await Product.findAll()
  const user1 = await User.findById(1)

  await order.setUser(user1)
  await order.addProducts([...allProducts])

  const checkout = await order.getProducts()

  // console.log(Object.values(checkout))
  // checkout.forEach(v => {
  //   console.log(v.name)
  // })

  // await Promise.all(
  //   checkout.map(async product => {
  //     try {
  //       let item = await OrderItem.findOne({
  //         where: {productId: product.id, orderId: order.id}
  //       })

  //       let itemPrice = product.price * item.quantity
  //       await item.update({price: itemPrice})
  //       let total = order.total + item.price
  //       await order.update({total: total})

  //       console.log('prod :: ', product.name)
  //       console.log('price :: ', product.price)
  //       console.log('quantity :: ', item.quantity)
  //       console.log('total price for item :: ', item.price)
  //       console.log('total price for order :: ', order.total)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   })
  // )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
