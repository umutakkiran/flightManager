import React, { useEffect } from 'react'
import FlightIcon from '@mui/icons-material/Flight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import { TextBody, TextDisplay } from '../shared/Texts/Texts';
import BookFlight from '../components/BookFlight';
import FlightCardList from '../components/FlightCardList';
import FilterSection from '../components/FilterSection';
import SidePanel from '../components/SidePanel';
import CustomDialog from '../shared/CustomDialog';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../shared/CustomButton';
import { stepActions } from '../utils/slices/stepSlice';
function Home() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [flightDirection, setFlightDirection] = React.useState(" ");
    const [alignment, setAlignment] = React.useState("Round Trip");
    const [departureScheduleDate, setDepartureScheduleDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [arrivalScheduleDate, setArrivalScheduleDate] = React.useState(new Date().toISOString().split('T')[0]);
    const step = useSelector((state) => state.step.step); // Redux'taki step değerini alır
    const bookedFlights = useSelector((state) => state.bookedFlights); // Redux'taki step değerini alır


    const dispatch = useDispatch();
    const { data: flights, isLoading, refetch, isRefetching } = useGenericQueryHook(`/api/flights/${page}/${departureScheduleDate}/${flightDirection}`, "flights", false);

    useEffect(() => {
        refetch();
    }, [flightDirection]);

    return (
        <div className=' h-auto lg:h-screen w-screen bg-slate-100 p-6 relative  '>
            <div className=' h-full w-full  flex flex-col p-6 gap-4  rounded-3xl'>
                <div className=' flex flex-col lg:flex-row justify-between'>
                    <div className=' flex flex-row gap-2 items-center'>
                        <div className=' w-8 h-8 rounded-full bg-[#6420AA] relative'>
                            <FlightIcon className=' absolute -left-1' sx={{ fontSize: 32 }} style={{ color: '#ffffff', rotate: '90deg' }} />
                        </div>
                        <TextDisplay>Plane Scape</TextDisplay>
                    </div>
                    <div className=' flex flex-row gap-8'>
                        <div className=' flex flex-row gap-4'>
                            <div className=' flex flex-row gap-2 items-center'>
                                <LocalOfferIcon style={{ color: 'var(--primary-color)' }} />
                                <TextBody>
                                    Deals
                                </TextBody>
                            </div>
                            <div className=' flex flex-row gap-2 items-center'>
                                <PublicIcon style={{ color: 'var(--primary-color)' }} />
                                <TextBody>
                                    Discover
                                </TextBody>
                            </div>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <div className=' w-8 h-8 rounded-full bg-black'>
                            </div>
                            <TextBody>
                                Umut Akkiran
                            </TextBody>
                        </div>
                    </div>

                </div>
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
                            flights?.data?.flights.length > 0 &&
                            <div className=' xl:grid xl:grid-cols-8 gap-4'>
                                {
                                    step === 2 ?
                                        <div className=' w-full h-full flex justify-center items-center'>
                                            <CustomButton onClick={() => {
                                                dispatch(stepActions.changeStep(0));
                                            }} label={"Cancel"} />
                                            <CustomButton onClick={() => console.log(JSON.stringify(bookedFlights) + "UÇUŞLAR")} label={"Done"} />
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
                                                        setAlignment={setAlignment}
                                                        setFlightDirection={setFlightDirection}
                                                    />
                                                </div>
                                                <div className='hidden xl:flex xl:col-span-2'>
                                                    <FilterSection />
                                                </div>
                                            </>
                                }
                            </div>
                        }
                    </div>
                    <div className=' xl:col-span-2 h-auto '>
                        <SidePanel />
                    </div>

                </div>
                <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} >
                    <FilterSection />
                </CustomDialog>
            </div>
        </div>
    )
}

export default Home