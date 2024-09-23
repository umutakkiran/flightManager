import React from 'react';
import FlightCard from './FlightCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomSteppers from '../shared/CustomStepper';
import CustomSelect from '../shared/CustomSelect';


function FlightCardList({ setIsOpen, isOpen, flights, refetch, page, setPage, alignment, setFlightDirection }) {
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

  const data = Array.from({ length: 200 }, (_, index) => ({
    value: index,
    publicName: {
      english: index
    }
  }));

  return (
    <div className='flex flex-col gap-20 lg:gap-10 xl:overflow-y-auto h-auto xl:h-[32rem] relative'>
      <div className=' flex flex-col gap-2 p-2 sticky top-0 left-0 bg-slate-100 bg-opacity-10 z-10 backdrop-blur-sm'>
        <div className=' w-full flex flex-row justify-between '>
          <div className='flex flex-row gap-1 items-center'>
            <div
              onClick={decreasePage}
              className={page === 0 ? ` border-2  p-1 rounded-md bg-white flex justify-center items-center opacity-50 ` : `border p-1 rounded-md hover:cursor-pointer bg-white flex justify-center items-center `}
            >
              <ArrowBackIosIcon />
            </div>
            <CustomSelect rightRadius leftRadius radiusAmount={"4px"} borderWidth={0} width={75} height={32} firstValue={page} data={data} onChange={(e) => { setPage(e); refetch() }} />
            <div
              onClick={increasePage}
              className={`border-2 p-1 rounded-md hover:cursor-pointer bg-white flex justify-center items-center `}
            >
              <ArrowForwardIosIcon />
            </div>
          </div>
          <div onClick={toggleFilterSideBar} className=' flex xl:hidden hover:cursor-pointer'>
            <FilterAltIcon />
          </div>
        </div>
        {
          alignment === "Round Trip" &&
          <CustomSteppers firstText={"Select Departure Flight"} secondText={"Select Arrival Flight"} />
        }
      </div>


      {
        flights &&
        flights?.data?.flights.map((flight, index) => (
          <FlightCard
            key={flight.id}
            destinations={getDestinations(index)}
            flight={flight}
            alignment={alignment}
            setFlightDirection={setFlightDirection}
          />
        ))
      }

    </div>
  );
}

export default FlightCardList;
