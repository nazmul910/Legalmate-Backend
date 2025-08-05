import express from 'express';
import cors from 'cors'
import router from './app/routes';
import globalErrorHandler from './app/midlleWear/globalErrorHandler';
import notFound from './app/midlleWear/notFound';
import cookieParser from 'cookie-parser'


const app = express();

//Middlewars

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",router)

app.get("/",(req,res) =>{
  res.send("Hello Legalmate!")
})


app.use(notFound)
app.use(globalErrorHandler);

export default app;