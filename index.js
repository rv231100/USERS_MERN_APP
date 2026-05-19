// import dotenv from "dotenv";
// dotenv.config();
import 'dotenv/config';
import express, { json } from "express";
import cors from "cors";
// import path, { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
const port = process.env.PORT||5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import CookieParser from 'cookie-parser'
import router from './routes/router.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
import dbConnection from './dbConnection.js';
import errorController from './controllers/errorController.js';
import cookieParser from "cookie-parser";

app.use(json());
app.use(cookieParser())


app.use('/route',router);

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/",express.static("./build"))


//localhost:5000/user/signup
app.use('/user',userRouter);


app.get("{*any}", (req, res) => {
    res.sendFile(path.join(__dirname,"./build/index.html"));
});
// app.get('{*any}',(req,res)=>{
//     res.sendFile(path.join(__dirname,"./build/index.html"))
// })

app.use(errorController);
// app.use('/admin',adminRouter);


app.listen(port,()=>{
    console.clear();
    console.log(`Example app listening on port ${port}`)});

    //Middlewares;
// app.get('/',(req,res)=>{
//     console.log(req.method,req.path);
//     res.status(200);
//     res.send({success:true,msg:" mern Node-Express Server.."})
// });