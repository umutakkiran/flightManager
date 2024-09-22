import React from 'react'
import FlightIcon from '@mui/icons-material/Flight';
import { TextTitle } from '../shared/Texts/Texts';
import CustomToggle from '../shared/CustomToggle';
import CustomSelect from '../shared/CustomSelect';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CustomButton from '../shared/CustomButton';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import CustomDatePicker from '../shared/CustomDatePicker';


function BookFlight({ refetch, setPage, setDepartureScheduleDate, setArrivalScheduleDate, departureScheduleDate, arrivalScheduleDate, alignment , setAlignment, setFlightDirection }) {
    const { data: destinations, isLoading: destinationsLoading } = useGenericQueryHook(`/api/destination`, 'destinations', true);

    if (!destinationsLoading) {
        console.log(JSON.stringify(destinations?.data?.destinations))
    }

    const isArrivalBeforeDeparture = (departureDate, arrivalDate) => {
        const departure = new Date(departureDate);
        const arrival = new Date(arrivalDate);

        // Eğer arrival, departure'dan önceyse true döner, bu geçersiz bir durumdur
        return arrival < departure;
    };

    function getNewSearch() {

        if (alignment === "Round Trip") {
            if (departureScheduleDate && arrivalScheduleDate && isArrivalBeforeDeparture(departureScheduleDate, arrivalScheduleDate)) {
                alert('Arrival date cannot be before the departure date.');
                return; // Arrival date, departure date'den önceyse aramayı durdur
            }
            setFlightDirection("D");
        }else{
            setFlightDirection(" ");
        }

        setPage(0);
        refetch()
    }

    return (
        <div className=' w-full h-auto p-8 rounded-3xl flex flex-col gap-8 bg-white'>
            <div className=' flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-2'>
                <div className=' w-full flex flex-row gap-4 justify-center lg:justify-start items-center'>
                    <FlightIcon sx={{ fontSize: 24 }} style={{ color: '#000000', rotate: '90deg' }} />
                    <TextTitle>
                        Book Your Flight
                    </TextTitle>
                </div>
                <CustomToggle alignment={alignment} setAlignment={setAlignment} firstText={"Round Trip"} SecondText={"One Way"} />
            </div>
            <div className=' w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
                <div className=' flex flex-row gap-2'>
                    <CustomSelect data={destinations?.data?.destinations} leftRadius startIcon={FlightTakeoffIcon} label={""} />
                    <CustomSelect data={destinations?.data?.destinations} rightRadius startIcon={FlightLandIcon} label={""} />
                </div>
                <div className=' flex flex-row gap-2'>
                    {
                        alignment === "Round Trip" ?
                            <CustomDatePicker leftRadius setScheduleDate={setDepartureScheduleDate} />
                            :
                            <CustomDatePicker leftRadius rightRadius setScheduleDate={setDepartureScheduleDate} />
                    }
                    {
                        alignment === "Round Trip" &&
                        <CustomDatePicker rightRadius setScheduleDate={setArrivalScheduleDate} />
                    }
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-2'>
                <CustomButton onClick={getNewSearch} label={'Show Flights'} />
            </div>
            

        </div>
    )
}

export default BookFlight