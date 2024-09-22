import React from 'react';
import FlightCard from './FlightCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomSteppers from '../shared/CustomStepper';


function FlightCardList({ setIsOpen, isOpen, flights, refetch, page, setPage, alignment, setAlignment, setFlightDirection }) {
  let destinations = [];

  function getDestinations(index) {
    if (flights) {
      destinations = flights?.data?.flights[index]?.route?.destinations;
    }
    return destinations;
  }

  function increasePage() {
    if (flights?.data?.flights.length > 0) {
      setPage((prevPage) => prevPage + 1);
      refetch()
    }

  }

  function decreasePage() {
    if (page > 0 && flights?.data?.flights.length > 0) {
      setPage((prevPage) => prevPage - 1);
      refetch();
    }
  }

  function toggleFilterSideBar() {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }



  return (
    <div className='flex flex-col gap-20 lg:gap-10 xl:overflow-y-auto h-auto xl:h-[32rem] relative'>
      <div className=' p-2 w-full flex flex-row justify-between sticky top-0 left-0 bg-slate-100 bg-opacity-10 z-10 backdrop-blur-sm'>
        <div className='flex flex-row gap-2'>
          <div
            onClick={decreasePage}
            className={page === 0 ? `border p-1 rounded-md bg-white flex justify-center items-center opacity-50 ` : `border p-1 rounded-md hover:cursor-pointer bg-white flex justify-center items-center `}
          >
            <ArrowBackIosIcon />
          </div>
          <div
            onClick={increasePage}
            className={`border p-1 rounded-md hover:cursor-pointer bg-white flex justify-center items-center `}
          >
            <ArrowForwardIosIcon />
          </div>
        </div>
        <div onClick={toggleFilterSideBar} className=' flex xl:hidden'>
          <FilterAltIcon />
        </div>

      </div>
      {
                alignment === "Round Trip" &&
                <CustomSteppers firstText={"Select Departure Flight"} secondText={"Select Arrival Flight"} />
            }
      {
        flights?.data?.flights.map((flight, index) => (
          <FlightCard
            key={flight.id}
            takeOffTime={flight.scheduleDateTime}
            LandingTime={flight.actualLandingTime}
            price={"200$"}
            tripType={"Round Trip"}
            destinations={getDestinations(index)}
            icao={flight.prefixICAO}
            direction={flight.flightDirection}
            serviceType={flight.serviceType}
            flightCode={flight.flightName}
            flightNumber={flight.flightNumber}
            alignment={alignment}
            setFlightDirection={setFlightDirection}
          />
        ))
      }

    </div>
  );
}

export default FlightCardList;
