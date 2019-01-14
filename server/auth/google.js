const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 */

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(
  googleConfig,
  async (token, refreshToken, profile, done) => {
    try {
      console.log('profile :: \n\n\n\n', profile)
      const googleId = profile.id
      const {name} = profile
      const email = profile.emails[0].value
      const user = await User.findOrCreate({
        where: {
          googleId,
          email,
          firstName: name.givenName,
          lastName: name.familyName
        }
      })
      await done(user)
    } catch (err) {
      console.error(err)
    }
  }
)

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)
