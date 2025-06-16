import React from 'react'
import LoginPage from './Authentication/LoginPage/page'
//import HomePage from './pages/Homepage/page'
//import ExploreTweet from './pages/ExploreTweet/page'

const Home = () => {
  return (
    <div className="bg-blue-400 flex-basis justify-center items-center">
        <h1 className="text-5xl text-center text-pink-700 font-extrabold p-3">Welcome to Gossips</h1>
        <LoginPage/>
    
    </div>
  )
}

export default Home


