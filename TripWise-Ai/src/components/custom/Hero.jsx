import React from 'react'
import {Button} from '../ui/button.jsx'
import {Link} from 'react-router-dom'
import { Separator } from "@/components/custom/separator.jsx"
function Hero() {
  return (
    <div className = "flex flex-col items-center mx-56 gap-9">
     <h1 className = " font-extrabold text-[60px] text-center mt-16">
      <span className = " text-[#5547b1]">Explore Your Next Adventure With The Power Of AI: </span> Your Wise Trip Planner</h1>
      <p className= "text-xl">TripWise is your personal trip planner and travel curator, creating custom itineraies tailored to your interests and budget. </p> 
      <Link to={'/create-trip'}>
      <Button>Start Exploring</Button>
      </Link>
      <img src="/landing.jpeg" alt="" className='w-[850px] m-10 rounded-2xl shadow-2xl' />
      <div className="h-[100px]"></div> 
      <Separator />
    </div>
  )
}

export default Hero;