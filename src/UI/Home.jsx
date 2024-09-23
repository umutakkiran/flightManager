import React, { useEffect } from 'react'
import BookFlight from '../components/BookFlight';
import FlightCardList from '../components/FlightCardList';
import FilterSection from '../components/FilterSection';
import SidePanel from '../components/SidePanel';
import CustomDialog from '../shared/CustomDialog';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { stepActions } from '../utils/slices/stepSlice';
import { bookedFlightsActions } from '../utils/slices/bookedFlightsSlice';
import Navbar from '../components/Navbar';
import ThirStep from '../components/ThirStep';
import LottiePlayer from '../utils/lottiePlayer';
import planeAnimation from '../assets/animations/planepurple.json'
function Home() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [flightDirection, setFlightDirection] = React.useState(" ");
    const [alignment, setAlignment] = React.useState("One Way");
    const [departureScheduleDate, setDepartureScheduleDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [arrivalScheduleDate, setArrivalScheduleDate] = React.useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const step = useSelector((state) => state.step.step);


    const { data: flights, isLoading, refetch, isRefetching } = useGenericQueryHook(`/api/flights/${page}/${step === 1 ? arrivalScheduleDate : departureScheduleDate}/${flightDirection}`, "flights", false);

    useEffect(() => {
        if (alignment === "Round Trip" && step === 0) {
            setFlightDirection("D")
        }
        refetch();
    }, [flightDirection, step]);

    useEffect(() => {
        dispatch(stepActions.changeStep(0));
        dispatch(bookedFlightsActions.refreshBookedFlights());
    }, [alignment]);

    return (
        <div className=' h-auto lg:h-screen w-screen bg-slate-100 p-6 relative  '>
            <div className=' h-full w-full  flex flex-col p-6 gap-4  rounded-3xl'>
                <Navbar />
                <div className=' flex flex-col xl:grid xl:grid-cols-8 rounded-3xl h-full w-full py-8 gap-10 xl:gap-4'>
                    <div className=' col-span-6 h-auto flex flex-col gap-4'>
                        <BookFlight refetch={refetch}
                            setPage={setPage}
                            setDepartureScheduleDate={setDepartureScheduleDate}
                            departureScheduleDate={departureScheduleDate}
                            setArrivalScheduleDate={setArrivalScheduleDate}
                            arrivalScheduleDate={arrivalScheduleDate}
                            alignment={alignment}
                            setAlignment={setAlignment}
                            setFlightDirection={setFlightDirection}
                        />
                        {
                            isLoading ?
                                <LottiePlayer autoplay={true} animationData={planeAnimation} loop={true} text={"Trying To Fetch Flights..."} />
                                :
                                <>
                                    {
                                        flights?.data?.flights.length > 0 &&
                                        <div className=' xl:grid xl:grid-cols-8 gap-4'>
                                            {
                                                step === 2 ?
                                                    <div className=' w-full xl:col-span-8 h-auto overflow-y-auto flex flex-col justify-center items-center p-2 gap-20 lg:gap-10 border rounded-3xl bg-white shadow-xl'>
                                                        <ThirStep />
                                                    </div>
                                                    :
                                                    isRefetching ?
                                                        <CircularProgress sx={{ color: 'var(--primary-color)', scale: 0.5 }} />
                                                        :
                                                        <>
                                                            <div className=' xl:col-span-6'>
                                                                <FlightCardList
                                                                    isOpen={isOpen}
                                                                    setIsOpen={setIsOpen}
                                                                    flights={flights}
                                                                    refetch={refetch}
                                                                    page={page}
                                                                    setPage={setPage}
                                                                    alignment={alignment}
                                                                    setFlightDirection={setFlightDirection}
                                                                />
                                                            </div>
                                                            <div className='hidden xl:flex xl:col-span-2'>
                                                                <FilterSection alignment={alignment} setFlightDirection={setFlightDirection} flightDirection={flightDirection} />
                                                            </div>
                                                        </>
                                            }
                                        </div>
                                    }
                                </>
                        }
                    </div>
                    <div className=' mt-40 xl:mt-0 xl:col-span-2 h-auto '>
                        <SidePanel />
                    </div>
                </div>
                <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} >
                    <FilterSection alignment={alignment} setFlightDirection={setFlightDirection} flightDirection={flightDirection} />
                </CustomDialog>
            </div>
        </div>
    )
}

export default Home