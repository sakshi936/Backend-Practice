import express from "express";
import connectDB from "./db";
import cros from "cros";
import cookieParser from "cookie-parser";

const app = express();


// configuring cros in apllication using cros options 
app.use(cros({
    origin: process.env.CROS_ORIGIN,
    Credential: true
}))

// express configuration for limit json data request
app.use(express.json({limit:"16kb"}))  

// express express configuration for you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({extended: true, limit:"16kb"}))


//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static("public"))

//
app.use(cookieParser())
export {app};