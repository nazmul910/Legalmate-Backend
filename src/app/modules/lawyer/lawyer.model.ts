import { Schema,model } from "mongoose";

import{
  TAvailability,
  TEducation,
  TExperience,
  TLawyer,
  TLicense,
  TReview
} from './lawyer.interface';


const experienceSchema = new Schema<TExperience>({
  title:{type:String,required:true},
  company:{type:String,required:true},
  location:String,
  description:String,
  startDate:{type:String,required:true},
  endDate:String,
  isCurrent:Boolean
},
{
  _id:false
}
);

const educationSchema = new Schema<TEducation>(
  {
  degree:{type:String,required:true},
  fieldOfStudy:String,
  institution:{type:String,required:true},
  startDate:{type:String,required:true},
  endDate:String,
  honors:String,
  description:String
},
{_id:false}
);

const licenseSchema = new Schema<TLicense>(
  {
    state:{type:String,required:true},
    licenseNumber:String,
    acquiredDate:{type:String,required:true},
    expiryDate:{type:String,required:true},
    status:{
      type:String,
      enum:["active","inactive","suspended","revoked"],
      required:true
    }
  },
  {_id:false}
);


const reviewSchema = new Schema<TReview>(
  {
    reviewerName:{type:String,required:true},
    reviewerEmail:{type:String,required:true},
    date:{type:String,required:true},
    comment:{type:String,required:true},
    rating:{type:Number,required:true},
  },
  {_id:false}
);

const availabilitySchema = new Schema<TAvailability>(
  {
    days:[{type:String}],
    timeSolts:[{type:String}],
  },
  {_id:false}
)

const lawyerSchema = new Schema<TLawyer>(
  {
    name:{type:String,required:true},
    user:{type:Schema.Types.ObjectId, ref:"User", required:true},
    email:{type:String,required:true,unique:true},
    profileImage:String,
    about:String,
    contactNumber:String,
    location:String,
    workArea:String,
    practiceAreas:[String],
    specializations:[String],
    status:{
      type:String,
      enum:["approved","pending","rejected"],
      default:"pending",
    },
    isVerified:{type:Boolean,default:false},
    license:{type:licenseSchema},    //,required:true
    education:[educationSchema],
    experience:[experienceSchema],
    consultationFee:Number,
    consultationTime:String,
    rating:Number,
    totalReviews:Number,
    reviews:[reviewSchema],
    documents:[String],
    solvedCases:Number,
    availability:availabilitySchema,
    isDeleted:{type:Boolean,default:false}
  },
  {timestamps:true}
);

export const Lawyer = model<TLawyer>("Lawyer",lawyerSchema);

