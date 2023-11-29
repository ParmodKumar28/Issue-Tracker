// Connecting mongodb.
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB;
const connectUsingMongoose = async ()=>{
    try {
        mongoose.connect(url,{
            family: 4
        });
        
        console.log("Mongodb connected.");
    } catch (error) {
       console.log("Error connecting with mongodb."); 
    }
}

export default connectUsingMongoose;