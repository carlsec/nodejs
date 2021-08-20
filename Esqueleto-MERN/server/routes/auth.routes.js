/**
 * '/auth/signin': POST request to authenticate he user with their email and password.
 * '/auth/signout': GET resquest to clear the cookie containing a JWT that ws set on the response object afer sign-in.
 */

import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)

export default router