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
  let order = await Order.findById(1)
  let prod = await Product.findAll()

  await order.addProducts([...prod])
  const testItem = await OrderItem.findOne({where: {productId: 1, orderId: 1}})
  await testItem.decrease()
  await testItem.decrease()
  await testItem.save()
  console.log(testItem.quantity)
  // console.log('res :: \n\n\n\n', res)

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
