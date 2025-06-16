
import UserModel from "@/app/utils/userModel/usersModel";
import { DBconnection } from "@/app/utils/config/db";

export async function GET(req, { params }) {
  await DBconnection();
  console.log("DB connected in user[id]")
  const { id } = params;

  try {
    const user = await UserModel.findById(id).select("name email");
    console.log("user details in  user[id] from db: ",user);
    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
