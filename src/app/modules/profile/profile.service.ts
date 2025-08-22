import ApiError from "../../utils/AppError";
import { Lawyer } from "../lawyer/lawyer.model";
import httpStatus from "http-status";

const getLawyerProfileFromDb = async (userId: string) => {
  console.log("userId: ", userId);

  const lawyerProfile = await Lawyer.findOne({ user: userId });
  if (!lawyerProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Lawyer Profile not found");
  }

  return lawyerProfile;
};

export const ProfileServices = {
  getLawyerProfileFromDb,
};