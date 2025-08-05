import express from 'express'
import { AuthValidation } from './auth.validation'
import validateRequest from '../../utils/ValidateRequenst'
import { AuthControllers } from './auth.controller'
import auth from '../../midlleWear/auth'
import USER_ROLE from '../../constants/userRole'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser

)
router.post('/change-password',
  auth(USER_ROLE.client,USER_ROLE.lawyer,USER_ROLE.admin),
  validateRequest(AuthValidation.ChangePassworValidationSchema),
  AuthControllers.changePassword

)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken

)

router.post("/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
)

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword
)


export const AuthRouter = router

