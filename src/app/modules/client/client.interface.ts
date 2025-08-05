import { Types } from "mongoose"

export interface TClinet {
  name:string
  user:Types.ObjectId
  email:string
  img?:string
  location?:string
  occupation?:string
  status:"approved" | "rejected"
  isDeleted:boolean
}