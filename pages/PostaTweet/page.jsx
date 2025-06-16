"use client";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { FaGrin } from "react-icons/fa";
import Navbar from "@/app/Components/Navbar";

export default function Tweet() {
  const [tweetTitle, setTweetTitle] = useState("");
  const [tweetBody, setTweetBody] = useState("");
  const [tweetTags, setTweetTags] = useState("")

  const handleTweetTitleChange = (e) => {
    setTweetTitle(e.target.value);
  };
  const handleTweetBodyChange = (e) => {
    setTweetBody(e.target.value);
  };

  const handleTweetTagsChange = (e) => {
    setTweetTags(e.target.value);
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/Tweets/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title:tweetTitle, body:tweetBody,tags:tweetTags}),
    });
    const result = await response.json();
    console.log(result);
    setTweetTitle("");
    setTweetBody("");
    setTweetTags("");
    alert("Tweet Submitted: " + tweetBody);
  };

  const handleTweetCancel = () => {
    alert("Tweet Cancelled: " + tweetBody);
    setTweetBody("");
  };

  return (
    <div className="bg-blue-300 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center mt-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Tweet Something!</h1>
        
        <div className="w-full max-w-md bg-sky-200 border-2 rounded-md p-4">
          <textarea
            className="w-full mb-3 p-2 rounded-md resize-none"
            rows="2"
            value={tweetTitle}
            onChange={handleTweetTitleChange}
            placeholder="Type the Title of tweet"
          />
          <textarea
            className="w-full mb-3 p-2 rounded-md resize-none"
            rows="5"
            value={tweetBody}
            onChange={handleTweetBodyChange}
            placeholder="What's on your mind?"
          />
          <textarea
            className="w-full mb-3 p-2 rounded-md resize-none"
            rows="1"
            value={tweetTags}
            onChange={handleTweetTagsChange}
            placeholder="Add tags (comma separated)"
          />
          <div className="flex gap-2">
            <FaImage className="size-6 text-gray-700" />
            <FaGrin className="size-6 text-yellow-500" />
          </div>
        </div>
        
        
        <div className="flex sm:flex-row gap-4 mt-5">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg"
            onClick={handleTweetSubmit}
          >
            Tweet
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-lg"
            onClick={handleTweetCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
