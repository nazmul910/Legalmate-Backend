import mongoose from "mongoose"
import app from './app';
import config from "./app/config";



let server  

async function main(){
  try {
    await mongoose.connect(config.mongo_url as string)
    server = app.listen(config.port,()=>{
      console.log(`Legalmate listen in prot : ${config.port}`);
    })
  } catch (error) {
    console.log(error)
  }
}

main();