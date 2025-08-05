import { Types } from "mongoose";

export type TExperience = {
  title: string;
  company: string;
  location?: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
}

export type TEducation = {       
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  startDate: string;
  endDate?: string;
  honors?: string;
  description?: string;
}

export type TLicense = {
  state: string;
  licenseNumber: string;
  acquiredDate: string;
  expiryDate?: string;
  status: "active" | "Inactive" | "suspended" | "revoked";
}

export type TReview = {
  reviewerName:string,
  reviewerEmail:string,
  date:string,
  comment:string,
  rating:number
};

export type TAvailability = {
  days:string[];
  timeSolts:string[];
};

export type TLawyer = {
name: string; 
user:Types.ObjectId
email: string; 
profileImage?: string; 
about?: string; 
contactNumber?: string; 
location?: string; 
workArea?: string; 
practiceAreas?: string[]; 
specializations?: string[]; 
status: "approved" | "pending" | "rejected"; 
isVerified: boolean; 
license?: TLicense; 
education?: TEducation[]; 
experience?: TExperience[]; 
consultationFee?: number; 
consultationTime?: string; 
rating?: number; 
totalReviews?: number; 
reviews?: TReview[]; 
documents?: string[]; 
solvedCases?: number;
availability?:TAvailability;
isDeleted:boolean;

}