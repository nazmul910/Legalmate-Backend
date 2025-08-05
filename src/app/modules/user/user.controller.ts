import { Request, Response } from "express";
import  httpStatus  from "http-status";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";

const getAllUsers = catchAsync( async (req,res,next) => {
     const result = await UserServices.getAllUsersFronDb();

     sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Users data retrieved successfully",
      data:result
     })

    //  if(!result){
    //    res.status(404).json({
    //      success:false,
    //      message:"Users not found"
    //    })
    //    res.status(200).json({
    //      success:true,
    //      message:"Users data retrieved successfully!",
    //      data:result
    //    })
    //  } 
})

const createAUser = catchAsync(async (req,res,next) =>{
  const result = await UserServices.CreateAUserIntoDb(req.body)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User created successfully",
    data:result
   })
})

export const UserControllers = {
  getAllUsers,
  createAUser,
}