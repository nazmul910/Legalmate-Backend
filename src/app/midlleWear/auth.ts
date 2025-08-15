import config from "../config"
import { verifyToken } from "../modules/auth/auth.utils"
import { User } from "../modules/user/uer.model"
import { TUserRole } from "../modules/user/user.interface"
import ApiError from "../utils/AppError"
import { catchAsync } from "../utils/CatchAsync"
import httpStatus  from "http-status"
import { JwtPayload } from "jsonwebtoken"
const auth = (...requireRoles: TUserRole[]) =>{
  return catchAsync(async(req,res,next) =>{
    const token = req.headers.authorization
    // const token = req.headers.authorization?.split(" ")[1]

    if(!token){
      throw new ApiError(httpStatus.UNAUTHORIZED,"Token not found. Unauthorized user!");
    }
    let decoded
    try{
      decoded = verifyToken(token,config.jwt_access_secret as string)
    }catch(error){
      throw new ApiError(httpStatus.UNAUTHORIZED,"Could not verify token.");
    }

    const {userId,role} = decoded as JwtPayload

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

    if(requireRoles && !requireRoles.includes(role)){
      throw new ApiError(httpStatus.UNAUTHORIZED,"Role mismatched. Unauthorized user!")
    }

    req.user = decoded as JwtPayload
    next()


  })
}



export default auth
