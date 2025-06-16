"use server";

import { NextResponse } from "next/server";
import UserModel from "@/app/utils/userModel/usersModel";
import bcrypt from "bcryptjs";
import { DBconnection } from "@/app/utils/config/db";


export async function POST(request){
     await DBconnection()
     const {name,email,password}=await request.json();
     console.log(name,email,password)
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        await UserModel.create({
            name: name,
            email: email,
            password:hashedPassword
          })

        return new Response(
              JSON.stringify({ message: "User created successfully" }),
              { status: 201 }
            );
    }catch(error){
        console.error("Error creating user:",error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
        });
    }
}





  