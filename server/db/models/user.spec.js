/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody
      const testUser = {
        firstName: 'Perle',
        lastName: 'Longstreeth',
        email: 'plongstreeth0@jugem.jp',
        address: '309 Dawn Point',
        isAdmin: false,
        isGuest: true,
        password: 'WKqjUdalxjR2'
      }

      beforeEach(async () => {
        cody = await User.create(testUser)
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('WKqjUdalxjR2')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('wrong-password')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
