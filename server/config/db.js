import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config;

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected successfully")
    }catch(error){
        console.error({message:"Failed to connect MongoDb"})
        process.exit(1);
    }
};

export default connectDB;