import React, { useState, useEffect } from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import { TextTitle } from '../shared/Texts/Texts';
import CustomToggle from '../shared/CustomToggle';
import CustomSelect from '../shared/CustomSelect';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CustomButton from '../shared/CustomButton';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import CustomDatePicker from '../shared/CustomDatePicker';
import { toast } from 'react-toastify';

function BookFlight({ refetch, setPage, setDepartureScheduleDate, setArrivalScheduleDate, departureScheduleDate, arrivalScheduleDate, alignment, setAlignment, setFlightDirection }) {
    const { data: destinations, isLoading: destinationsLoading } = useGenericQueryHook(`/api/destination`, 'destinations', true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if ( departureScheduleDate || arrivalScheduleDate) {
            setIsAnimating(true);
        }
    }, [ departureScheduleDate, arrivalScheduleDate]);

    const handleClick = () => {
        // Butona tıklandığında animasyon durdurulur
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
            if (departureScheduleDate && arrivalScheduleDate && isArrivalBeforeDeparture(departureScheduleDate, arrivalScheduleDate)) {
                toast.error('Arrival date cannot be before the departure date.');
                return;
            }
            setFlightDirection("D");
        } else {
            setFlightDirection(" ");
        }
        setPage(0);
        refetch();
    }

    return (
        <div className={`w-full h-auto p-8 rounded-3xl flex flex-col gap-8 bg-white `}>
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
                    <CustomSelect data={destinations?.data?.destinations} leftRadius startIcon={FlightTakeoffIcon} label={""} />
                    <CustomSelect data={destinations?.data?.destinations} rightRadius startIcon={FlightLandIcon} label={""} />
                </div>
                <div className='flex flex-row gap-2'>
                    {alignment === "Round Trip" ?
                        <CustomDatePicker leftRadius setScheduleDate={setDepartureScheduleDate} />
                        :
                        <CustomDatePicker leftRadius rightRadius setScheduleDate={setDepartureScheduleDate} />
                    }
                    {alignment === "Round Trip" ?
                        <CustomDatePicker rightRadius setScheduleDate={setArrivalScheduleDate} />
                        :
                        <CustomDatePicker disabled={true} rightRadius setScheduleDate={setArrivalScheduleDate} />
                    }
                </div>
            </div>
            <div className={`w-full flex flex-col lg:flex-row justify-between items-center gap-2 ${isAnimating ? ' animate-bounce' : ''}`}>
                {/* Show Flights butonu */}
                <CustomButton 
                    onClick={handleClick} 
                    label={'Show Flights'} 
                />
            </div>
        </div>
    );
}

export default BookFlight;
