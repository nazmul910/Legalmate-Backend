import  httpStatus  from "http-status"
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { LawyerServices } from "./lawyer.service";
import { Request, Response } from "express";
import ApiError from "../../utils/AppError";

const getAllLawyers = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.getAllLaywerFromDb();
  sendResponse(res,{
    statusCode:httpStatus.OK,
      success:true,
      message:"Lawyers All data retrieved successfully",
      data:result
  })
});



const getSingleLawyers = catchAsync(async(req:Request,res:Response) =>{
  const result = await LawyerServices.getSingleLawyersFromDB(req.params.id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
      success:true,
      message:"Lawyers data1 retrieved successfully",
      data:result
  })
})

const uploadLawyerImage = catchAsync(async(req:Request,res:Response,next) =>{
  console.log("reqFromlawerContorller: ",req.user,req.file)
  const result = await LawyerServices.uploadLawyerImageIntoDB(req.user, req.file)
  sendResponse(res,{
    statusCode:httpStatus.OK,
      success:true,
      message:"Lawyers photo uploaded successfully",
      data:result
  })         
})


const addLawyerProfile = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.addLawyerProfileInDB(
    req.user.userId,
    req.body
  )
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer profile update successfully",
    data:result
   })
})
const addLawyerLicense = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.addLawyerLicenseInDB(
    req.user.userId,
    req.body
  )
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer license added successfully",
    data:result
   })
})

//
const addLawyerDocument = catchAsync(async (req:Request,res:Response) =>{
   if (!Array.isArray(req.files)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Files must be an array");
  }

  const result = await LawyerServices.addLawyerDocumentInDB(
    req.user.userId,
    req.files  //as Express.Multer.File[]
  )
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer document added successfully",
    data:result
   })
})
const deleteLawyerDocument = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.deleteLawyerDocumentInDB(
    req.user.userId,
    req.body
  )
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer document deleted successfully",
    data:result
   })
})

 const addLawyerEducation = catchAsync(async(req:Request,res:Response) =>{
  const result = await LawyerServices.addLawyerEducationInDB(
    req.user.userId,
    req.body
  )
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer education added successfully",
    data:result
   })
 })

 const deleteLawyerEducation = catchAsync(async(req:Request,res:Response) =>{
  const result = await LawyerServices.deleteLawyerEducationInDB(
    req.user.userId,
    req.body
  )
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer education deleted successfully",
    data:result
   })
 })



  const addLawyerExperience = catchAsync(async(req:Request,res:Response) =>{
  const result = await LawyerServices.addLawyerExperienceInDB(
    req.user.userId,
    req.body
  )
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer experience added successfully",
    data:result
   })
 })

  const deleteLawyerExperience = catchAsync(async(req:Request,res:Response) =>{
  const result = await LawyerServices.deleteLawyerExperienceInDB(
    req.user.userId,
    req.body
  )
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer experience deleted successfully",
    data:result
   })
 })

 const updateLawyerStatus = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.updateLawyerStatusInDB(
    req.user.userId,
    req.body
  )
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer status updated successfully",
    data:result
   })
 });

 const deleteLawyer = catchAsync(async (req:Request,res:Response) =>{
  const result = await LawyerServices.deleteLawyerInDB(req.user.userId)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Lawyer deleted successfully",
    data:result
   })
 });

export const LawyerController = {
  getAllLawyers,
  uploadLawyerImage,
  getSingleLawyers,
  addLawyerProfile,
  addLawyerLicense,
  addLawyerDocument,
  deleteLawyerDocument,
  addLawyerEducation,
  deleteLawyerEducation,
  addLawyerExperience,
  deleteLawyerExperience,
  updateLawyerStatus,
  deleteLawyer
  
}