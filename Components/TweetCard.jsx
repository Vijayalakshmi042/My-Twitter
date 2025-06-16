"use client";
import { FaRegUserCircle } from "react-icons/fa";

export default function TweetCard({ tweet }) {
  
  console.log("TweetCard component rendered with tweet:", tweet._id);
  return (
    <div className="flex flex-row border-none rounded-2xl m-3 p-4">
      <FaRegUserCircle className="mr-3 size-10" />
      <div className="flex flex-col w-full">
        <p className="text-xl font-bold text-red-800">
          <strong>{tweet.title || "Untitled Tweet"}</strong>
        </p>
        <p className="text-sm text-black">{tweet.body || "No content available."}</p>
        <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center mt-2">
          <p className="m-2 hover:text-blue-600 transition-colors">
            👍 {tweet.reactions.likes}
          </p>
          <p className="m-2 hover:text-red-600 transition-colors">
            👎 {tweet.reactions.dislikes}
          </p>
          <div className="text-right mt-2 sm:ml-auto">
            <p>Tags: {tweet.tags?.join(", ") || "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
