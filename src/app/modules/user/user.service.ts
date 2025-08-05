import config from "../../config";
import ApiError from "../../utils/AppError";
import { User } from "./uer.model"
import bcrypt from "bcrypt"
import httpStatus from 'http-status'
import { TUser } from "./user.interface";
import { Client } from "../client/client.model";
import { Lawyer } from "../lawyer/lawyer.model";
const getAllUsersFronDb = async() =>{
  const result = await User.find();
  return result;
}

const CreateAUserIntoDb = async(payload:TUser) =>{ 

  const existingUser = await User.findOne({
    email:payload.email
  })

  if(existingUser){
    throw new ApiError(httpStatus.CONFLICT,"User already exists!!");
  }

  
  const newHashPassword = await bcrypt.hash(payload.password, Number(config.salt_round))

  payload.password = newHashPassword

  const result = await User.create(payload);

  const userData = {
    name:payload.name,
    email:payload.email,
    user:result._id
  }

  if(payload.role == "client"){
    await Client.create(userData)
  } else if(payload.role == 'lawyer'){
    await Lawyer.create(userData)
  }

  return result;
} 

export const UserServices = {
  getAllUsersFronDb,
  CreateAUserIntoDb
}