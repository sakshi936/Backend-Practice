import express from "express";
// import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// configuring cors in apllication using cors options 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))
// express configuration for limit json data request
app.use(express.json({limit:"16kb"}))  
// express express configuration for you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({extended: true, limit:"16kb"}))
//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'

// routes declaration 
app.use('/api/v1/users',userRouter );   // url will be --> http://localhost:8000/api/v1/users/register 


export {app};