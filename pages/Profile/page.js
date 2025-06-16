"use client";
import { useSession } from "next-auth/react";
import Navbar from "@/app/Components/Navbar";
import { useRouter } from "next/router";


export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log({session,status})
  const router=useRouter();

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (!session) {
      router.push("/") 
      return <p className="text-center text-red-500">You are not signed in.</p>;
     
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
