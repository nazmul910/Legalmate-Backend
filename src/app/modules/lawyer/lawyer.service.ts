import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../utils/AppError";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary";
import { User } from "../user/uer.model";
import { TEducation, TExperience, TLawyer, TLicense } from "./lawyer.interface";
import { Lawyer } from "./lawyer.model"
import  httpStatus  from "http-status";



const checkLawyerStatus = async (id:string) =>{
  const lawyer = await Lawyer.findOne({user:id});
  if(!lawyer) throw new ApiError(httpStatus.NOT_FOUND,"Lawyer not found");
  if(lawyer.isDeleted || lawyer.status === "rejected"){
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Connot perform action on deleted or rejected lawyer")
  }
  return lawyer
}

 const checkAdminStatus = async (userId: string) => {
  const admin = await User.findById(userId);

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  if (admin.role !== "admin") {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
       "Only admin can perform this action.");
  }

  return admin;
};


const getAllLaywerFromDb = async() =>{
  return Lawyer.find({isDeleted:false});
}

const uploadLawyerImageIntoDB = async(userData:JwtPayload,file:any) =>{
  const lawyer = await Lawyer.findOne({user: userData.userId})
  console.log("services: ",userData,file);
  if(!lawyer) throw new ApiError(404,"Not Found!")

  if(file){
    const fileName = `${lawyer.name}-${Date.now()}`
    const {secure_url} = await sendFileToCloudinary(fileName,file.path, 'image') as {secure_url: string}
    
 const result =   await Lawyer.findOneAndUpdate(
      { user: userData.userId },
      { profileImage: secure_url },
      { new: true }
    )
    return result
}
else throw new ApiError(httpStatus.BAD_GATEWAY,"Please provide an image first!")

}
const getSingleLawyersFromDB = async(id:string) =>{
  const lawyer = await Lawyer.findById(id).populate("user");
  if(!lawyer) throw new ApiError(httpStatus.NOT_FOUND,"Lawyer not found");
  return lawyer
}

const addLawyerProfileInDB = async (id:string ,payload:Partial<TLawyer>) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate({user:id},payload,{
    new:true
  })
  return result;
}

const addLawyerLicenseInDB = async (id:string,data:TLicense) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$set:{license:data}},
    {new:true}
  )
  return result
}
//
const addLawyerDocumentInDB = async(id:string,files:Express.Multer.File[]) =>{
    await checkLawyerStatus(id);
    const lawyer =await Lawyer.findOne({user:id});
    if(!lawyer) throw new ApiError(404,"Not Fonud!")

    if(!files || files.length === 0){
      throw new ApiError(httpStatus.BAD_GATEWAY,"Please provied at least one file!")
    }  
    let uploadedUrls: string[] = []

    for(const file of files){
      const fileName = ` ${lawyer.name}-${Date.now()} `
      const {secure_url} = await sendFileToCloudinary(fileName,file.path ,'row') as {secure_url:string}

      uploadedUrls.push(secure_url);
    }

    const result = await Lawyer.findOneAndUpdate(
      {user:id},
      {$push:{documents:{ $each : uploadedUrls }}},
      {new:true}
    )
    return result
}

const deleteLawyerDocumentInDB = async(id:string,document:string) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$pull:{documents:document}},
    {new:true}
  )
  return result
}

const addLawyerEducationInDB = async (id:string,data:TEducation) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$push:{education:data}},
    {new:true}
  )
  return result
}

const deleteLawyerEducationInDB= async(id:string,data:TEducation) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$pull:{education:data}},
    {new:true}
  )

  return result
}

const addLawyerExperienceInDB = async (id:string,data:TExperience) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$set:{experience:data}},
    {new:true}
  )
  return result
}



const deleteLawyerExperienceInDB = async(id:string,data:TExperience) =>{
  await checkLawyerStatus(id);
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$pull:{experience:data}},
    {new:true}
  )

  return result
}

const updateLawyerStatusInDB = async(id:string,status:string) =>{
  // await checkLawyerStatus(id);  addmin er jonno status banate hobe karon ati admin thik korbe
  
  await checkAdminStatus(id)
  if(status === "approved"){
    await Lawyer.findOneAndUpdate(
      {user:id},
      {$set:{status:status, isVerified:true}},
      {new:true}
    );
  }
  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$set:{status:status, isVerified:false}},
    {new:true}
  );
  return result;
}


const deleteLawyerInDB = async(id:string) =>{
  // await checkLawyerStatus(id);  addmin er jonno status banate hobe karon ati admin thik korbe

  await checkAdminStatus(id)

  const result = await Lawyer.findOneAndUpdate(
    {user:id},
    {$set:{isDeleted:true,status:"rejected",isVerified:false}},
    {new:true}
  )
  return result
}




export const LawyerServices = {
  getAllLaywerFromDb,
  getSingleLawyersFromDB,
  addLawyerProfileInDB,
  uploadLawyerImageIntoDB,
  addLawyerLicenseInDB,
  addLawyerDocumentInDB,
  deleteLawyerDocumentInDB,
  addLawyerEducationInDB,
  deleteLawyerEducationInDB,
  addLawyerExperienceInDB,
  deleteLawyerExperienceInDB,
  updateLawyerStatusInDB,
  deleteLawyerInDB
}