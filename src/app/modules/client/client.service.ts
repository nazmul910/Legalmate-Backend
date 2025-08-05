import { Client } from "./client.model"

const getAllCilentsFromDb = async () =>{
  const client = await Client.find({isDeleted:false});
  return client
}
const getSingleCilentFromDb =async (id:string) =>{
  const client = await Client.findById(id, {isDeleted:false} ).populate("user");
  return client
}

export const ClientServices = {
  getAllCilentsFromDb,
  getSingleCilentFromDb
}