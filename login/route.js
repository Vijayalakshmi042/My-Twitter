"use server";
import bcrypt from "bcrypt";
import UserModel from "@/app/utils/userModel/usersModel";
import { NextResponse } from "next/server";
import { DBconnection } from "@/app/utils/config/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await DBconnection();
  try {
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.warn("No user found for email:", email);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn("Password mismatch for user:", email);
      throw new Error("Invalid credentials");
    }
    const token=jwt.sign({id:user._id,user:user.name,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
    

    const res=NextResponse.json({message:"Successfully Logged In!",
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
      },
    });
    res.cookies.set("authToken",token,{httpOnly:true,path:"/"});
    return res;


  } catch (error) {
    console.error("Login error:", error.message);
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
  }
  
}
