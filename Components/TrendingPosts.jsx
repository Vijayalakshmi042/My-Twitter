"use client";

import React, { useEffect, useState } from "react";

export default function TrendingPosts() {
  const [trendTweets, setTrendTweets] = useState({});

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const url = "https://dummyjson.com/posts";
        const res = await fetch(url);
        const data = await res.json();

        const tweets = data.posts || [];

        const groupedTweets = {};

        tweets.forEach((tweet) => {
          const tags = tweet.tags || [];
          tags.forEach((tag) => {
            if (!groupedTweets[tag]) {
              groupedTweets[tag] = [];
            }
            groupedTweets[tag].push(tweet);
          });
        });

        setTrendTweets(groupedTweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className="p-4">
      {Object.keys(trendTweets).length === 0 ? (
        <p>Loading trending posts...</p>
      ) : (
        Object.keys(trendTweets)
          .sort()
          .map((tag) => {
            const tweetsByTag = trendTweets[tag];
            return (
              <div key={tag} className="mb-4">
                <h3 className="text-base font-medium mb-2">
                  #{tag} ({tweetsByTag.length} Tweets)
                </h3>
              </div>
            );
          })
      )}
    </div>
  );
}
