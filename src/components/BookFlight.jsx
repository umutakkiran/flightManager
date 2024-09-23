import React, { useState, useEffect } from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import { TextTitle } from '../shared/Texts/Texts';
import CustomToggle from '../shared/CustomToggle';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CustomButton from '../shared/CustomButton';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import CustomDatePicker from '../shared/CustomDatePicker';
import { toast } from 'react-toastify';
import CustomTextField from '../shared/CustomTextField';
import { useSelector } from 'react-redux';

function BookFlight({ refetch, setPage, alignment, setAlignment, setFlightDirection }) {
    const { data: destinations } = useGenericQueryHook(`/api/destination`, 'destinations', true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [initialRender, setInitialRender] = useState(true); // İlk render kontrolü için
    const arrivalScheduleDate = useSelector((state) => state.arrival.arrivalDate);
    const departureScheduleDate = useSelector((state) => state.departure.departureDate);

    useEffect(() => {
        // İlk render'da animasyonu başlatma
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        // props'larda bir değişiklik varsa animasyonu başlat
        if (departureScheduleDate || arrivalScheduleDate) {
            setIsAnimating(true);
        }
    }, [departureScheduleDate, arrivalScheduleDate, initialRender]);

    const handleClick = () => {
        setIsAnimating(false);
        getNewSearch();
    };

    const isArrivalBeforeDeparture = (departureDate, arrivalDate) => {
        const departure = new Date(departureDate);
        const arrival = new Date(arrivalDate);
        return arrival < departure;
    };

    function getNewSearch() {
        if (alignment === "Round Trip") {
            if (departureScheduleDate === null || arrivalScheduleDate === null ) {
                toast.error('Choose a date first.');
                return;
            }
            if (departureScheduleDate && arrivalScheduleDate && isArrivalBeforeDeparture(departureScheduleDate, arrivalScheduleDate)) {
                toast.error('Arrival date cannot be before the departure date.');
                return;
            }
            setFlightDirection("D");
        } else {
            if (departureScheduleDate === null ) {
                toast.error('Choose a date first.');
                return;
            }
            setFlightDirection(" ");
        }

        setPage(0);
        refetch();
    }

    return (
        <div className={`w-full h-auto p-8 rounded-3xl flex flex-col gap-8 bg-white`}>
            <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-2'>
                <div className='w-full flex flex-row gap-4 justify-center lg:justify-start items-center'>
                    <FlightIcon sx={{ fontSize: 24 }} style={{ color: '#000000', rotate: '90deg' }} />
                    <TextTitle>
                        Book Your Flight
                    </TextTitle>
                </div>
                <CustomToggle setFlightDirection={setFlightDirection} alignment={alignment} setAlignment={setAlignment} firstText={"Round Trip"} SecondText={"One Way"} />
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
                <div className='flex flex-row gap-2'>
                    <CustomTextField data={destinations?.data?.destinations} leftRadius StartIcon={FlightTakeoffIcon} placeholder={"Departure"} />
                    <CustomTextField data={destinations?.data?.destinations} rightRadius StartIcon={FlightLandIcon} placeholder={"Arrival"} />
                </div>
                <div className='flex flex-row gap-2'>
                    {alignment === "Round Trip" ?
                        <CustomDatePicker leftRadius type={1} />
                        :
                        <CustomDatePicker leftRadius type={1} />
                    }
                    {alignment === "Round Trip" ?
                        <CustomDatePicker rightRadius type={2} />
                        :
                        <CustomDatePicker disabled={true} rightRadius type={2}  />
                    }
                </div>
            </div>
            <div className={`w-full flex flex-col lg:flex-row justify-between items-center gap-2 ${isAnimating ? ' animate-bounce' : ''}`}>
                <CustomButton 
                    onClick={handleClick} 
                    label={'Show Flights'} 
                />
            </div>
        </div>
    );
}

export default BookFlight;
