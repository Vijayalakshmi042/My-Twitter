import TweetCard from "@/app/Components/TweetCard";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetail({ params }) {
  const tweet = await getTweet(params.id);

  return (
    <main>
      <TweetCard tweet={tweet}/>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}