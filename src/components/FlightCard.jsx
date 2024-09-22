import React from 'react';
import { TextBody, TextDisplay, TextLabel, TextTitle } from '../shared/Texts/Texts';
import CustomButton from '../shared/CustomButton';
import DateConverter from '../utils/dateConverter';
import FlightIcon from '@mui/icons-material/Flight';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import SimpleDialog from '../shared/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { stepActions } from '../utils/slices/stepSlice';
import { bookedFlightsActions } from '../utils/slices/bookedFlightsSlice';

const serviceTypes = [
  { id: 'J', name: 'Passenger Line' },
  { id: 'C', name: 'Passenger Charter' },
  { id: 'F', name: 'Freight Line' },
  { id: 'H', name: 'Freight Charter' },
];

const getAirportText = (direction, city) => {
  if (direction === 'A') {
    return (
      <div className='flex flex-row gap-2'>
        <TextTitle>{city}</TextTitle> - <TextTitle>Amsterdam Airport Schiphol</TextTitle>
      </div>
    );
  }

  if (direction === 'D') {
    return (
      <div className='flex flex-row gap-2'>
        <TextTitle>Amsterdam Airport Schiphol</TextTitle> - <TextTitle>{city}</TextTitle>
      </div>
    );
  }

  return null;
};

const getAirportInfo = (direction, city) => {
  if (direction === 'A') {
    return <TextBody>Airport: {city}</TextBody>;
  }

  if (direction === 'D') {
    return <TextBody>Airport: Amsterdam Airport Schiphol</TextBody>;
  }

  return null;
};

function FlightCard({ takeOffTime, LandingTime, price, tripType, destinations, icao, direction, serviceType, flightCode,
  flightNumber, alignment, setFlightDirection }) {
  const step = useSelector((state) => state.step.step); // Redux'taki step değerini alır
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  const { data: destination, isLoading: destinationLoading } = useGenericQueryHook(`/api/destination/${destinations[destinations.length - 1]}`, 'destination', true);
  const { data: airline, isLoading: airlineLoading } = useGenericQueryHook(`/api/airlines/${icao}`, `airline${icao}`, true);

  if (!airlineLoading) {
    console.log(JSON.stringify(airline?.data));
  }

  function checkIfDatePassed(dateString) {
    // Sep 20, 01:25 AM formatındaki tarihi Date objesine çevir
    const date = new Date(dateString);
    // Şu anki tarih ve saat
    const now = new Date();
    return date < now
  }

  function bookFlight() {
    if (takeOffTime && checkIfDatePassed(takeOffTime)) {
      alert('Departure date cannot be in the past.');
      return; // Eğer tarih geçmişteyse aramayı durdur
    }

    setOpen(true)
  }

  function approveFlight(flight) {
    dispatch(stepActions.changeStep(step + 1));
    dispatch(bookedFlightsActions.getBookedFlights(flight));
    setFlightDirection("A")
    setOpen(false)
  }

  return (
    <div className='relative w-full rounded-3xl rounded-bl-none flex flex-col gap-4 p-4 bg-white border'>
      <div>{getAirportText(direction, destination?.data.city)}</div>

      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-2 items-center'>
          <TextBody>Departure</TextBody>
          <DateConverter dateString={takeOffTime} />
          {getAirportInfo(direction, destination?.data.city)}
        </div>

        <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

        <div className='flex flex-col gap-2 items-center'>
          <TextBody>{airline?.data.publicName}</TextBody>
          <FlightIcon sx={{ fontSize: 32 }} style={{ color: '#000000', rotate: '90deg' }} />
          <div className=' flex flex-row gap-2'>
            {serviceTypes.find(type => type.id === serviceType) && (
              <>
                <TextBody>
                  {serviceTypes.find(type => type.id === serviceType).name}
                </TextBody>
                <TextBody>
                  {`(${flightCode})`}
                </TextBody>
                <TextBody>
                  {`(${flightNumber})`}
                </TextBody>
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

        <div className='flex flex-col gap-2 items-center'>
          <TextBody>Arrival</TextBody>
          <DateConverter dateString={LandingTime} />
          {getAirportInfo(direction, destination?.data.city)}
        </div>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-2'>
          <TextTitle color='var(--primary-color)'>Price: {price}</TextTitle>
          <TextLabel>{tripType}</TextLabel>
        </div>
        <div className='absolute bottom-0 right-0'>
          <CustomButton onClick={bookFlight} width={200} height={60} label='Book Flight' />
        </div>
      </div>

      <div className='absolute left-0 -bottom-8 p-4 w-auto h-8 bg-[#CDC1FF] rounded-b-lg flex justify-center items-center'>
        <TextBody color='#6420AA'>Check The Details</TextBody>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        flight={flightCode}
      >
        <div className=' w-auto h-auto rounded-3xl flex flex-col gap-4 p-4'>
          <TextDisplay >Here Is Your Flight</TextDisplay>
          <div className=' flex flex-col gap-2'>
            <TextBody>{flightCode}</TextBody>
            <TextBody>{flightNumber}</TextBody>
            <TextBody>{takeOffTime}</TextBody>
            <TextBody>{LandingTime}</TextBody>
            <TextBody>{direction}</TextBody>
            <TextBody>{destination?.data.city}</TextBody>
          </div>
          <CustomButton onClick={() => approveFlight(
            {
              code: `${flightCode}`,
              number: `${flightNumber}`,
              takeOffTime: `${takeOffTime}`,
              landingTime: `${LandingTime}`,
              direction: `${direction}`,
              city: `${destination?.data.city}`
            }
          )} width={200} height={60} label='Book Flight' />
        </div>
      </SimpleDialog>
    </div>
  );
}

export default FlightCard;
