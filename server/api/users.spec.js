/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/user/:id', () => {
    const testUser = {
      firstName: 'Perle',
      lastName: 'Longstreeth',
      email: 'plongstreeth0@jugem.jp',
      address: '309 Dawn Point',
      isAdmin: false,
      isGuest: true,
      password: 'WKqjUdalxjR2'
    }

    beforeEach(() => {
      return User.create(testUser)
    })

    xit('GET /api/user/:id', async () => {
      const res = await request(app)
        .get('/api/user/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(testUser.email)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
