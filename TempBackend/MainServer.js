import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/Database.js";
import router from "./Routes/QueryRoute.js";

dotenv.config();


console.log('MONGO_URI:', process.env.MONGO_URI);  


const webServer = express();

webServer.use(cors());
webServer.use(express.json());

webServer.use("/api", router);

webServer.listen(5000, ()=>
{
    connectDB();
    console.log('Server is running on port 5000');

})
