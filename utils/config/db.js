import mongoose from 'mongoose';

export const DBconnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MangoDB")
    }
    catch(error){
        console.error('MongoDB connection failed:', error);
        throw error;
    }
}
