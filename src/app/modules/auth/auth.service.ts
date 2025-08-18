import ApiError from "../../utils/AppError";
import { User } from "../user/uer.model"
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import  httpStatus  from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import sendMail from "../../utils/SendEmail";
import { Lawyer } from "../lawyer/lawyer.model";


const loginUser = async (payload:TLoginUser) =>{
  const user = await User.findOne({email: payload.email}).select("+password");

  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND,"User Not Found!")
  }
  if(user?.isDeleted){
    throw new ApiError(httpStatus.UNAUTHORIZED,"User is Deleted!")
  }
  if(user?.status == 'blocked'){
    throw new ApiError(httpStatus.FORBIDDEN,"User is Blocked!")
  }
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if(!isPasswordMatched){
    throw new ApiError(httpStatus.FORBIDDEN,"Password did not match!!") 
  }

    // lawyer হলে তার profile বের করো
  let lawyerId = null;
  if (user.role === "lawyer") {
    const lawyer = await Lawyer.findOne({ user: user._id });
    lawyerId = lawyer?._id.toString();
  }

  const jwtPayload = {
    userId : user._id.toString(),
    role: user.role,
    lawyerId: lawyerId  //for single lawyer data find it use newly
  }

  const accessToken = createToken(
    jwtPayload, config.jwt_access_secret as string,Number(config.jwt_access_expires_in)
  )
  const refreshToken = createToken(
    jwtPayload, config.jwt_refresh_secret as string,Number(config.jwt_refresh_expires_in) 
  )

  return{
    accessToken,
    refreshToken
  }

}

const changePassword = async ( userData:JwtPayload ,payload:{oldPassword:string, newPassword:string}) =>{
  const user = await User.findById(userData.userId).select("+password");

  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND,"User Not Found!")
  }
  if(user?.isDeleted){
    throw new ApiError(httpStatus.UNAUTHORIZED,"User is Deleted!")
  }
  if(user?.status == 'blocked'){
    throw new ApiError(httpStatus.FORBIDDEN,"User is Blocked!")
  }
  const isPasswordMatched = await bcrypt.compare(payload.oldPassword, user.password);

  if(!isPasswordMatched){
    throw new ApiError(httpStatus.FORBIDDEN,"Password did not match!!") 
  }

  const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.salt_round))

  const result = await User.findOneAndUpdate(
    {
      _id:userData.userId,
      role:userData.role
    },
    {password:newHashPassword}
  )

  return null

}  



const refreshToken = async(token:string) =>{
  if(!token){
    throw new ApiError(httpStatus.UNAUTHORIZED,"Token not found. Unauthorized user!");
  }
  const decoded =verifyToken(token,config.jwt_refresh_secret as string)
  if(!decoded)
    throw new ApiError(httpStatus.UNAUTHORIZED,"Could not verify token.");

  const {userId} = decoded as JwtPayload

  const user = await User.findById(userId);

  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND,"User not Found!");
  }
  if(user.isDeleted){
    throw new ApiError(httpStatus.NOT_FOUND,"User not Found!");
  }
  if(user.status == 'blocked'){
    throw new ApiError(httpStatus.NOT_FOUND,"User is blocked");
  }

  const jwtPayload = {
    userId : user._id.toString(),
    role: user.role
  }

  const accessToken = createToken(
    jwtPayload, config.jwt_access_secret as string,Number(config.jwt_access_expires_in) 
  )

  return{
    accessToken
  }

}


const forgetPassword = async(email:string) =>{
  const user = await User.findOne({email});
  if(!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found")

  if(user.isDeleted){
    throw new ApiError(httpStatus.NOT_FOUND,"User is deleted")
  }
  if(user.status == 'blocked'){
    throw new ApiError(httpStatus.NOT_FOUND,"User is blocked")
  }  

  const jwtPayload = {
    userId : user._id.toString(),
    role: user.role
  }

  const token = createToken(
    jwtPayload, config.jwt_access_secret as string, 10 * 60 * 1000 // 10 minutes in milliseconds
  )
  // const resetUILInk =`${config.reset_pass_ui_link}?id=${user?._id}&token=${token}`
  const resetUILInk = `http://localhost:3000/reset-password?id=${user._id}&token=${token}`;

  sendMail(user?.email, `<p> ${resetUILInk}</p>`)
}


const resetPassword = async (payload:{id:string, newPassword:string},token:string) =>{
  const user = await User.findById(payload.id);
  if(!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found")

  if(user.isDeleted){
    throw new ApiError(httpStatus.NOT_FOUND,"User is deleted")
  }
  if(user.status == 'blocked'){
    throw new ApiError(httpStatus.NOT_FOUND,"User is blocked")
  }  


  const decoded = verifyToken(token,config.jwt_access_secret as string) as JwtPayload

  if(payload.id !== decoded.userId){
    throw new ApiError(httpStatus.FORBIDDEN,"Forbidden Access")
  }


  const newHashPassword = await bcrypt.hash(payload?.newPassword, Number(config.salt_round))
  await User.findOneAndUpdate({
    _id:decoded.userId,
    role:decoded.role
  },
  {
    password:newHashPassword
  }
)
 
}




export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
}