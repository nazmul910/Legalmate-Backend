import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { ProfileServices } from "./profile.service";
import { JwtPayload } from "jsonwebtoken";

const getLawyerProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;  
  const result = await ProfileServices.getLawyerProfileFromDb(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lawyer profile retrieved successfully",
    data: result,
  });
});

export const ProfileController = {
  getLawyerProfile,
};