"use client"
import Link from "next/link";
import Navbar from "@/app/Components/Navbar";
import TweetCard from "@/app/Components/TweetCard";
import { useState,useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import TrendingPosts from "@/app/Components/TrendingPosts";

 

export default function HomePage(){
    const [tweets, setTweets] = useState([]);
    

    useEffect(() => {
        async function fetchTweets() {
        try{  
            const res = await fetch("/api/Tweets/");
            const data = await res.json();
            console.log(data);
             if(data!= ""){
                setTweets(data);
                console.log("Recent Tweets",data);
            }else{
                setTweets([]);
            }
        }catch(err){
           console.log("Error fetching tweets",err);
        }
        }
        fetchTweets();
    }, []);




    const handleDelete = async (id) => {
    try {
        const res = await fetch(`/api/Tweets/${id}`, {
        method: "DELETE"
        });
        if (res.ok) {
        setTweets(tweets.filter(tweet => tweet._id !== id));
        } else {
        console.error("Failed to delete tweet");
        }
    } catch (error) {
        console.error("Delete error:", error);
    }
    };

    return(
        <main className="bg-blue-200 p-4 sm:p-10 text-center">
            <Navbar/>
            <div>
                <h1 className="text-3xl sm:text-5xl text-amber-900 font-bold mt-10 sm:mt-20">Welcome to Let's Tweet!</h1>
                <p className="text-lg sm:text-2xl text-amber-400 font-sans m-3">
                    Share your thoughts.Explore trending tweets.
                    <br/> 
                    Connect with the world.
                </p>
                <Link href="/pages/PostaTweet">
                    <button className="rounded-full w-48 sm:w-56 h-12 bg-blue-600 text-white text-lg sm:text-2xl font-semibold m-2">Let's Tweet</button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start mt-10">
                <section className="bg-white p-4 rounded-md shadow-sm">
                    <h1 className="text-xl sm:text-2xl text-black font-bold mb-4">Your Recent Tweets</h1>
                    {tweets.map((tweet) => (
                        <div key={tweet._id} className="flex flex-col md:flex-row justify-between items-start md:items-center border-2 border-black rounded-2xl m-3 p-4 hover:shadow-lg transition">
                            <Link href={`/api/Tweets/${tweet._id}`} className="flex-grow">
                                <TweetCard tweet={tweet} />
                            </Link>
                            <button className="text-right m-7 md:mt-0 md:ml-4 self-end md:self-auto text-gray-600 hover:text-gray-800">
                            Delete
                            </button>                                                            
                        </div>
                    ))}
                </section>


                <div className="grid grid-cols-1 gap-4">
                    <section className="bg-white p-4 rounded-md shadow-sm">
                        <h1 className="text-xl sm:text-2xl text-red-400 font-bold mb-3">Trending Now</h1>
                        <ul className="space-y-2">    
                           <TrendingPosts/> 
                        </ul>
                    </section>

                    <section className="bg-white p-4 rounded-md shadow-sm">
                        <h1 className="text-xl sm:text-2xl text-red-400 font-bold mb-3">Are you Interested to Follow</h1>
                        <ul className="space-y-2">
                            <li className="flex flex-col justify-start">
                                 <h1 className="text-gray-600 p-2 flex items-center">
                                    <FaRegUserCircle className="mr-3" size={24}/>
                                 user123</h1>
                            </li>
                            <li className="flex flex-col justify-start">
                                <h1 className="text-gray-600 p-2 flex items-center">
                                    <FaRegUserCircle className="mr-3" size={24}/>
                                 user234</h1>
                            </li>
                            <li className="flex flex-col justify-start">
                                <h1 className="text-gray-600 p-2 flex items-center">
                                    <FaRegUserCircle className="mr-3" size={24}/>
                                 user345</h1>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    )
}