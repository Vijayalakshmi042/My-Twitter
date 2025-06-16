import { NextResponse } from "next/server";
import { DBconnection } from "@/app/utils/config/db";
import TweetsModel from "@/app/utils/TweetModel/TweetsModel";



export async function GET(req, { params }) {
  await DBconnection();
  console.log("connected in server route for sigletweet...")
  let tweet;
  try {
    const {id}=await params;
    tweet = await TweetsModel.findById(id);
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }
    
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  return NextResponse.json(tweet, { status: 200 });
}




export async function DELETE(req, { params }) {
  await DBconnection();
  let tweetDeleted;
  try {
    const {id}=await params
    tweetDeleted = await TweetsModel.findByIdAndDelete(id);
    if (!tweetDeleted) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  return NextResponse.json(tweetDeleted, { status: 200 });
}