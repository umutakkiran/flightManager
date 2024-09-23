import React from 'react';
import { TextBody, TextTitle } from '../shared/Texts/Texts';
import FlightIcon from '@mui/icons-material/Flight';

const serviceTypes = [
  { id: 'J', name: 'Passenger Line' },
  { id: 'C', name: 'Passenger Charter' },
  { id: 'F', name: 'Freight Line' },
  { id: 'H', name: 'Freight Charter' },
];

function ThirdStepCard({ flight }) {

  return (
    <div className='relative w-full rounded-3xl rounded-bl-none flex flex-col gap-4 p-4 bg-[#CDC1FF] border shadow-lg'>
      <div>{"Airport:" + `${flight.airline}`}</div>

      <div className='flex flex-col gap-4 lg:flex-row justify-between'>
        <div className='flex flex-col gap-2 items-center'>
          <TextBody>Departure</TextBody>
          <TextTitle>
            {flight.takeOffTime}
          </TextTitle>
          {flight.takeOffAirport}
        </div>

        <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

        <div className='flex flex-col gap-2 items-center'>
          <TextBody>{flight.airline}</TextBody>
          <FlightIcon sx={{ fontSize: 32 }} style={{ color: '#000000', rotate: '90deg' }} />
          <div className=' flex flex-row gap-2'>
            {serviceTypes.find(type => type.id === flight.serviceType) && (
              <>
                <TextBody>
                  {serviceTypes.find(type => type.id === flight.serviceType).name}
                </TextBody>
                <TextBody>
                  {`(${flight.code})`}
                </TextBody>
                <TextBody>
                  {`(${flight.number})`}
                </TextBody>
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-2 border-2 lg:rotate-90 items-center' />

        <div className='flex flex-col gap-2 items-center'>
          <TextBody>Arrival</TextBody>
          <TextTitle>
            {flight.landingTime}
          </TextTitle>
          {flight.landingAirport}
        </div>
      </div>
    </div>
  );
}

export default ThirdStepCard;
