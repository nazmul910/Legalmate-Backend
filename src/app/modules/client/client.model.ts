import { model, Schema } from "mongoose";
import { TClinet } from "./client.interface";

const clientSchema = new Schema<TClinet>({
  name:{type:String,requied:true},
  user:{type:Schema.Types.ObjectId, ref:"User", required:true},
  email:{type:String,requied:true,unique:true},
  img:String,
  location:String,
  occupation:String,
  status:{type:String,enum:["approved","rejected"],required:true,default:"approved"},
  isDeleted:{type:Boolean,required:true,default:false},
},
{
  timestamps:true
} 


)

export const Client = model<TClinet>("client",clientSchema);