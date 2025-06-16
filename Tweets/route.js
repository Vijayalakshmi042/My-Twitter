import { NextResponse } from "next/server";
import { DBconnection } from "@/app/utils/config/db";
import TweetsModel from "@/app/utils/TweetModel/TweetsModel";
import jwt from 'jsonwebtoken';


export async function GET(){
    try{
        await DBconnection();
        const TweetsData= await TweetsModel.find({})
        console.log(TweetsData)
        return NextResponse.json(TweetsData)
    }catch (error) {
    console.error("Error Occured while reading Tweets", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
        });
    }
}



export async function POST(request){
    try{
        await DBconnection();

        const token=request.cookies.get("authToken")?.value;
        const { id,username }=jwt.verify(token,process.env.JWT_SECRET)
        
        const {title,body,tags} =await request.json()

        const newTweet= new TweetsModel({
            author:username,
            title:title,
            body:body,
            tags:tags
        })
        await newTweet.save();
        
        return NextResponse.json({Success:"Tweet Added."})
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
        })
    }
}
