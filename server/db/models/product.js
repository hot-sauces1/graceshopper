const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product
