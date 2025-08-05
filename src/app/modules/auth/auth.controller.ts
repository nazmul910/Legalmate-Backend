import { catchAsync } from "../../utils/CatchAsync"
import httpStatus from 'http-status'
import sendResponse from "../../utils/SendResponse"
import { AuthServices } from "./auth.service"
import config from "../../config"
import { JwtPayload } from "jsonwebtoken"

const loginUser =catchAsync(async(req,res,next) =>{
  const result = await AuthServices.loginUser(req.body);
  const {accessToken,refreshToken} = result;

  res.cookie("refreshToken",refreshToken,{
    secure:config.node_env == "production",
    httpOnly:true,
    sameSite:"none",
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Login successful",
    data:{accessToken}
  })
})
const changePassword =catchAsync(async(req,res,next) =>{
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Password changed successful",
    data:result
  })
})

const refreshToken =catchAsync(async(req,res,next) =>{
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Token is refreshed successful",
    data:result
  })
})


const forgetPassword =catchAsync(async(req,res,next) =>{
  const result = await AuthServices.forgetPassword( req.body.email);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Please check your mail",
    data:result
  })
})


const resetPassword =catchAsync(async(req,res,next) =>{
  const token = req.headers.authorization as string
  const result = await AuthServices.resetPassword( req.body , token);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Password has been reset!",
    data:result
  })
})


export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
}