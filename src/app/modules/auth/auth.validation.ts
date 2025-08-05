import {z} from 'zod';

const loginValidationSchema = z.object({
  body:z.object({
    email:z.string({required_error:"Email is required"}).email(),
    password:z.string({required_error:"Password is required"}),
  })

})

const ChangePassworValidationSchema = z.object({
  body:z.object({
    oldPassword:z.string({required_error:"Old Password is required"}),
    newPassword:z.string({required_error:"New Password is required"}),
  })

})


const refreshTokenValidationSchema = z.object({
  cookies:z.object({
    refreshToken:z.string({required_error:"Refresh Token is required"}) 
  })

})

const forgetPasswordValidationSchema = z.object({
  body:z.object({
    email:z.string({required_error:"Refresh Token is required"}).email() 
  })

})

const resetPasswordValidationSchema = z.object({
  body:z.object({
    id: z.string({required_error:"Id is required"}),
    newPassword: z.string({required_error:"Password is required"}),
  })
})

export const AuthValidation = {
  loginValidationSchema,
  ChangePassworValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
}