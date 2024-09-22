import React from 'react'
import FlightBar from '../components/FlightBar'
import { TextTitle } from '../shared/Texts/Texts'
import MyFlightCard from '../components/MyFlightCard'


function Flights() {
  return (
    <div className=' w-full min-h-screen h-auto flex flex-col bg-slate-100'>
      <FlightBar />
      <div className=' w-full h-full p-6 flex flex-col gap-4'>
        <div className=' flex flex-row gap-2 items-center'>
          <TextTitle>My Flights</TextTitle>
        </div>
        <div className=' flex flex-col gap-10 mb-10'>
          <MyFlightCard />
          <MyFlightCard />
          <MyFlightCard />
          <MyFlightCard />
          <MyFlightCard />
          <MyFlightCard />
        </div>
      </div>
    </div>
  )
}

export default Flights