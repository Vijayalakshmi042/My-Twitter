"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user;

  return (
    <main className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-left text-2xl sm:text-4xl font-bold mb-2">
            Let's Tweet
          </h1>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white"
          >
            {menuOpen ? <FaX size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        <nav className="hidden sm:flex sm:justify-between sm:items-center gap-2 md:gap-6">
          <Link href="/pages/Homepage" className="text-base sm:text-xl text-black hover:text-white hover:underline font-sans m-2">
            Home
          </Link>
          <Link href="/pages/ExploreTweet" className="text-base sm:text-xl text-black hover:text-white hover:underline font-sans m-2">
            ExploreTweets
          </Link>
          <Link href="/pages/PostaTweet" className="text-base sm:text-xl text-black hover:text-white hover:underline font-sans m-2">
            PostaTweet
          </Link>
          <Link href="/pages/Profile" className="text-base sm:text-xl text-black hover:text-white hover:underline font-sans m-2">
            Profile
          </Link>
          <div>
            {user ? (
              <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded m-2">
                Logout
              </button>
            ) : (
              <button onClick={() => signIn()} className="bg-green-500 px-4 py-2 rounded m-2">
                Login
              </button>
            )}
          </div>
        </nav>
      </div>

      {menuOpen && (
        <nav className="sm:hidden bg-blue-600 px-4 py-2 space-y-2">
          <Link href="/pages/Homepage" className="block text-white hover:underline">Home</Link>
          <Link href="/pages/ExploreTweet" className="block text-white hover:underline">Explore Tweets</Link>
          <Link href="/pages/PostaTweet" className="block text-white hover:underline">Post a Tweet</Link>
          <Link href="/pages/Profile" className="block text-white hover:underline">Profile</Link>
          <div>
            {user ? (
              <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded m-2">
                Logout
              </button>
            ) : (
              <button onClick={() => signIn()} className="bg-green-500 px-4 py-2 rounded m-2">
                Login
              </button>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
