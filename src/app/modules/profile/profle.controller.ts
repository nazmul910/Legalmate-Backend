import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { ProfileServices } from "./profile.service";
import { JwtPayload } from "jsonwebtoken";

const getLawyerProfile = catchAsync(async (req: Request, res: Response) => {

  const result = await ProfileServices.getLawyerProfileFromDb(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const ProfileController = {
  getLawyerProfile,
};