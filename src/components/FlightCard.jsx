import React, { useEffect } from 'react';
import { TextBody, TextDisplay, TextLabel, TextTitle } from '../shared/Texts/Texts';
import CustomButton from '../shared/CustomButton';
import DateConverter from '../utils/dateConverter';
import FlightIcon from '@mui/icons-material/Flight';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import SimpleDialog from '../shared/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { stepActions } from '../utils/slices/stepSlice';
import { bookedFlightsActions } from '../utils/slices/bookedFlightsSlice';
import { toast } from 'react-toastify';
import { useAddMutate } from '../hooks/useGenericMutateHook';
import LottiePlayer from '../utils/lottiePlayer';
import { useNavigate } from "react-router-dom";
import successAnimation from '../assets/animations/success.json'



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

const getTakeOffAirportInfo = (direction, city) => {
  if (direction === 'A') {
    return `Airport: ${city}`;
  }

  if (direction === 'D') {
    return "Airport: Amsterdam Airport Schiphol";
  }

  return null;
};

const getLandingAirportInfo = (direction, city) => {
  if (direction === 'D') {
    return `Airport: ${city}`;
  }

  if (direction === 'A') {
    return "Airport: Amsterdam Airport Schiphol";
  }

  return null;
};

function FlightCard({ flight, destinations, setFlightDirection, alignment }) {
  const { mutate, isPending, isSuccess } = useAddMutate()

  const step = useSelector((state) => state.step.step); // Redux'taki step değerini alır
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);




  const handleClose = (value) => {
    setOpen(false);
  };

  const { data: destination, isLoading: destinationLoading } = useGenericQueryHook(`/api/destination/${destinations[destinations.length - 1]}`, 'destination', true);
  const { data: airline, isLoading: airlineLoading } = useGenericQueryHook(`/api/airlines/${flight.prefixICAO}`, `airline${flight.prefixICAO}`, true);

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
    if (flight.scheduleDateTime && checkIfDatePassed(flight.scheduleDateTime)) {
      toast.error('Departure date cannot be in the past.');
      return; // Eğer tarih geçmişteyse aramayı durdur
    }

    setOpen(true)
  }

  function approveFlight(flight) {
    if (alignment === "Round Trip") {
      dispatch(stepActions.changeStep(step + 1))
      dispatch(bookedFlightsActions.getBookedFlights(flight));
      setFlightDirection("A")
      setOpen(false)
    }

    if (alignment === "One Way") {
      const postData = {
        endpoint: `/api/tickets`,
        key: ["ticket"],
        data: { flight }
      }
      mutate(postData)
      setOpen(false)
    }
  }

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/flights");
    }, 600);

  };

  useEffect(() => {
    if (isSuccess) {
      setIsPlaying(true)
    }
  }, [isSuccess])


  return (
    <div className='relative w-full rounded-3xl rounded-bl-none flex flex-col gap-4 p-4 bg-white border shadow-lg'>
      {
        isPlaying ?
          <LottiePlayer autoplay={isPlaying} animationData={successAnimation} loop={false} onFinish={handleRedirect} text={"Redirecting To Your Flights Page..."} />
          :
          <>
            <div>{getAirportText(flight.flightDirection, destination?.data.city)}</div>

            <div className='flex flex-col gap-4 lg:flex-row justify-between'>
              <div className='flex flex-col gap-2 items-center'>
                <TextBody>Departure</TextBody>
                <TextTitle>
                  {DateConverter(flight.scheduleDateTime)}
                </TextTitle>
                {getTakeOffAirportInfo(flight.flightDirection, destination?.data.city)}
              </div>

              <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

              <div className='flex flex-col gap-2 items-center'>
                <TextBody>{airline?.data.publicName}</TextBody>
                <FlightIcon sx={{ fontSize: 32 }} style={{ color: '#000000', rotate: '90deg' }} />
                <div className=' flex flex-row gap-2'>
                  {serviceTypes.find(type => type.id === flight.serviceType) && (
                    <>
                      <TextBody>
                        {serviceTypes.find(type => type.id === flight.serviceType).name}
                      </TextBody>
                      <TextBody>
                        {`(${flight.flightName})`}
                      </TextBody>
                      <TextBody>
                        {`(${flight.flightNumber})`}
                      </TextBody>
                    </>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

              <div className='flex flex-col gap-2 items-center'>
                <TextBody>Arrival</TextBody>
                <TextTitle>
                  {DateConverter(flight.actualLandingTime)}
                </TextTitle>
                {getLandingAirportInfo(flight.flightDirection, destination?.data.city)}
              </div>
            </div>

            <div className='flex flex-row justify-between'>
              <div className='flex flex-col gap-2'>
                <TextTitle color='var(--primary-color)'>Price: {"$ 200"}</TextTitle>
                <TextLabel>{"Round Trip"}</TextLabel>
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
              flight={flight.flightName}
            >
              <div className=' w-auto h-auto rounded-3xl flex flex-col justify-center items-center gap-4 p-4'>
                <TextDisplay >Flight Information</TextDisplay>
                <div className=' flex flex-col lg:flex-row gap-8'>
                  <div className='flex flex-col p-4 bg-white shadow-md rounded-lg'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Flight Code:</TextBody>
                          {flight.flightName}
                        </TextTitle>
                      </div>
                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Flight Number:</TextBody>
                          {flight.flightNumber}
                        </TextTitle>
                      </div>

                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Departure Time:</TextBody>
                          {DateConverter(flight?.scheduleDateTime)}
                        </TextTitle>
                      </div>
                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Landing Time:</TextBody>
                          {DateConverter(flight?.actualLandingTime)}
                        </TextTitle>
                      </div>

                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Direction:</TextBody>
                          {flight?.flightDirection === "A" ? "Arrival" : "Departure"}
                        </TextTitle>
                      </div>
                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Destination:</TextBody>
                          {destination?.data.city}
                        </TextTitle>
                      </div>

                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>TakeOff Airport:</TextBody>
                          {getTakeOffAirportInfo(flight.flightDirection, destination?.data.city)}
                        </TextTitle>
                      </div>
                      <div className='flex flex-col items-start'>
                        <TextTitle>
                          <TextBody>Landing Airport:</TextBody>
                          {getLandingAirportInfo(flight.flightDirection, destination?.data.city)}
                        </TextTitle>
                      </div>
                    </div>
                  </div>

                </div>
                <CustomButton onClick={() => approveFlight(
                  {
                    code: `${flight?.flightName}`,
                    number: `${flight?.flightNumber}`,
                    takeOffTime: `${DateConverter(flight?.scheduleDateTime)}`,
                    landingTime: `${DateConverter(flight?.actualLandingTime)}`,
                    direction: `${flight?.flightDirection === "A" ? "Arrival" : "Departure"}`,
                    city: `${destination?.data.city}`,
                    serviceType: `${serviceTypes.find(type => type.id === flight.serviceType).name}`,
                    airline: `${airline?.data.publicName}`,
                    takeOffAirport: `${getTakeOffAirportInfo(flight.flightDirection, destination?.data.city)}`,
                    landingAirport: `${getLandingAirportInfo(flight.flightDirection, destination?.data.city)}`,
                  }
                )} width={200} height={60} label='Approve' />
              </div>
            </SimpleDialog>
          </>
      }
    </div>
  );
}

export default FlightCard;
