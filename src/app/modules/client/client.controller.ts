import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus  from "http-status";
import { ClientServices } from "./client.service";
import { Request, Response } from "express";



const getAllClients = catchAsync(async(req,res) =>{

  const result = await ClientServices.getAllCilentsFromDb()

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All Clients Fetched",
    data:result
  })
});

const getSingleClient = catchAsync(async(req:Request,res:Response) =>{

  const result = await ClientServices.getSingleCilentFromDb(req.params.id)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All Clients Fetched",
    data:result
  })
});

export const ClientController = {
  getAllClients,
  getSingleClient
}