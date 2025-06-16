"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router=useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("User created! Please login.");
        setFormData({ name: "", email: "", password: "" });
        router.push("/Authentication/LoginPage")
      }
      setMessage(result.message || result.error || "");
    } catch (error) {
      console.log(error);
      setMessage("An unexpected error occurred.");
    }
  }

  return (
    <div className="bg-blue-300 p-3 text-center h-[70px] m-2">
      <h1 className="font-extrabold text-5xl text-amber-800"> Welcome to Gossips</h1>
      <div className="bg-white text-center w-[400px] mt-20 ml-80 border-2">
        <h1 className="text-5xl font-extrabold text-blue-800 m-3">
          Register Here
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-xl border h-10 border-blue-300 m-4"
            value={formData.name}
          />
          <input
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            className="text-xl border h-10 border-blue-300 m-4"
            placeholder="Email"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="text-xl border h-10 border-blue-300 m-4"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-600 text-xl h-10 w-[200px] m-4 border rounded-sm"
          >
            Register
          </button>
        </form>
        {message && <p className="text-xl text-amber-950 m-4">{message}</p>}
      </div>
    </div>
  );
}