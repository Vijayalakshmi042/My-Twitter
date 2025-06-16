
import React from "react";
import TweetCard from "@/app/Components/TweetCard";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    console.error(`Tweet ${id} not found`);
    return null;
  }
  return res.json();
}

export default async function TweetDetail({ params }) {
  const tweet = await getTweet(params.id);

  return (
    <main>
      <TweetCard tweet={tweet}/>
      <a href="/pages/ExploreTweet" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}