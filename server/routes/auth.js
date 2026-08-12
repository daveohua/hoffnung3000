import express from 'express'
import { validate } from 'express-validation'

import authController from '../controllers/auth'
import authValidation from '../validation/auth'
import checkConfig from '../middlewares/configs'

const router = express.Router() // eslint-disable-line new-cap

// Retire the former visitor-ticket endpoint instead of allowing it to fall
// through to the generic signup route in this legacy Express router.
router.route('/signup/ticket')
  .all((req, res) => res.status(404).json({
    message: 'Route does not exist',
    status: 404,
  }))

router.route('/signup')
  .post(
    checkConfig('isSignUpParticipantEnabled'),
    validate(authValidation.signup),
    authController.signup
  )

router.route('/signup/paypal/success')
  .get(
    authController.paypalCheckoutSuccess
  )

router.route('/signup/paypal/cancel')
  .get(
    authController.paypalCheckoutCancel
  )

router.route('/login')
  .post(
    validate(authValidation.login),
    authController.login
  )

router.route('/reset/request')
  .post(
    validate(authValidation.requestResetToken),
    authController.requestResetToken
  )

router.route('/reset')
  .post(
    validate(authValidation.resetPassword),
    authController.resetPassword
  )

export default router
