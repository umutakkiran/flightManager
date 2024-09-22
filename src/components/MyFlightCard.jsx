import React from 'react'
import { TextBody, TextLabel, TextTitle } from '../shared/Texts/Texts'
import CustomButton from '../shared/CustomButton'

function MyFlightCard({ flightName, takeOffTime, LandingTime, takeOffAirport, landingAirport, price, tripType }) {
    return (
        <div className=' relative w-full rounded-3xl rounded-bl-none flex flex-col gap-4 p-4 bg-white'>
            <div>
                <TextTitle>{flightName}</TextTitle>
            </div>
            <div className=' flex flex-row justify-between'>
                <div className=' flex flex-col gap-2 items-center'>
                    <TextBody>Departure</TextBody>
                    <TextTitle>{takeOffTime}</TextTitle>
                    <TextBody>Airport: {takeOffAirport}</TextBody>
                </div>
                <div className=' flex flex-col gap-2 border-2 rotate-90 items-center' />
                <div className=' flex flex-col gap-2 items-center'>
                    <TextBody>Departure</TextBody>
                    <TextTitle>{takeOffTime}</TextTitle>
                    <TextBody>{takeOffAirport}</TextBody>
                </div>
                <div className=' flex flex-col gap-2 border-2 rotate-90 items-center' />
                <div className=' flex flex-col gap-2 items-center'>
                    <TextBody>Arrival</TextBody>
                    <TextTitle>{LandingTime}</TextTitle>
                    <TextBody>Airport:{landingAirport}</TextBody>
                </div>
            </div>
            <div className=' flex flex-row justify-between'>
                <div className=' flex flex-col gap-2'>
                    <TextTitle color='var(--primary-color)'>Price: {price}</TextTitle>
                    <TextLabel>{tripType}</TextLabel>
                </div>
                <div className=' absolute bottom-0 right-0'>
                    <CustomButton width={200} height={60} label={"Book Flight"} />
                </div>
            </div>
            <div className=' absolute left-0 -bottom-8 p-4 w-auto h-8 bg-[#CDC1FF] rounded-b-lg flex justify-center items-center'>
                <TextBody color={'#6420AA'}>Check The Details</TextBody>
            </div>
        </div>
    )
}

export default MyFlightCard