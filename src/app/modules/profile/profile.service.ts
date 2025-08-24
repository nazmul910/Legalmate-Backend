import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../utils/AppError";
import { Lawyer } from "../lawyer/lawyer.model";
import httpStatus from "http-status";
import USER_ROLE from "../../constants/userRole";
import { Client } from "../client/client.model";
import { User } from "../user/uer.model";

const getLawyerProfileFromDb = async (user: JwtPayload) => {
  let profile ;
  const {userId,role} = user ;
  if(role === USER_ROLE.client){
    profile = await Client.findOne({ user: userId });

  }else if(role === USER_ROLE.lawyer){
    profile = await Lawyer.findOne({user: userId})
  }else if( role === USER_ROLE.admin){
    profile = await User.findOne({user: userId});
  }
  
  // const lawyerProfile = await Lawyer.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Profile not found");
  }

  return profile;
};

export const ProfileServices = {
  getLawyerProfileFromDb,
};