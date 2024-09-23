import React from 'react'
import FlightBar from '../components/FlightBar'
import { TextTitle } from '../shared/Texts/Texts'
import MyFlightCard from '../components/MyFlightCard'
import Navbar from '../components/Navbar'
import { useGenericQueryHook } from '../hooks/useGenericQueryHook'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import LottiePlayer from '../utils/lottiePlayer';
import planeAnimation from '../assets/animations/planepurple.json'

function Flights() {
  const { data: tickets, isLoading, refetch, isRefetching } = useGenericQueryHook(`/api/tickets`, "tickets", true);

  return (
    <div className=' h-auto min-h-screen w-screen bg-slate-100 p-6 relative  '>
      <div className=' h-auto w-full  flex flex-col p-6 gap-4  rounded-3xl'>
        <Navbar />
        <div className=' w-full h-auto flex flex-col py-8 gap-4'>
          <FlightBar />
          
          <div className=' flex flex-col gap-10 mb-10'>
            {
              isLoading ?
              <LottiePlayer autoplay={true} animationData={planeAnimation} loop={true} />
                :
              tickets?.data?.map((ticket, index) => (
                <MyFlightCard
                  key={ticket._id}
                  takeOffTime={ticket.takeOffTime}
                  airline={ticket.airline}
                  landingAirport={ticket.landingAirport}
                  takeOffAirport={ticket.takeOffAirport}
                  LandingTime={ticket.LandingTime}
                  code={ticket.code}
                  number={ticket.number}
                  city={ticket.city}
                  direction={ticket.direction}
                  serviceType={ticket.serviceType}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default Flights