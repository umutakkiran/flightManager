import React, { useState } from 'react';
import { TextBody, TextLabel, TextTitle } from '../shared/Texts/Texts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function MyFlightCard({ takeOffTime, LandingTime, takeOffAirport, landingAirport, airline, serviceType, city, direction, code, number }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={` shadow-lg relative w-full rounded-3xl rounded-bl-none flex flex-col gap-4 p-4 bg-white transition-all duration-300 ${isOpen ? 'h-auto' : 'h-48'}`}>
            <div className='lg:grid lg:grid-cols-12'>
                <div className='lg:col-span-1 p-4'>
                    <TextTitle>{airline}</TextTitle>
                </div>
                <div className='lg:col-span-5 flex flex-col gap-2 p-4'>
                    <div className='flex flex-row gap-1'>
                        <TextTitle>{takeOffTime} - {LandingTime ? LandingTime : "Invalid Date"}</TextTitle>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <TextBody>{takeOffAirport} - {landingAirport}</TextBody>
                    </div>
                    <div className='flex flex-row gap-2 items-center hover:cursor-pointer' onClick={toggleDetails}>
                        <TextBody color={'var(--primary-color)'}>Flight Details</TextBody>
                        <KeyboardArrowDownIcon
                            sx={{ fontSize: 16 }}
                            style={{ color: 'var(--primary-color)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                        />
                    </div>
                </div>
                <div className=' hidden lg:flex lg:col-span-6 p-4 flex-row gap-4'>
                    <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2'>
                        <TextTitle>$ 186</TextTitle>
                        <TextBody>Main</TextBody>
                    </div>
                    <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2 bg-slate-100'></div>
                    <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2'>
                        <TextTitle>$ 210</TextTitle>
                        <TextBody>Business</TextBody>
                    </div>
                    <div className='h-32 w-24 bg-slate-100 rounded-md border flex justify-center items-center flex-col gap-2'></div>
                    <div className='h-32 w-24 bg-slate-100 rounded-md border flex justify-center items-center flex-col gap-2'></div>
                </div>
            </div>

            {/* Detaylar bölümü */}
            {isOpen && (
                <div className='mt-4 p-4 bg-gray-100 rounded-lg flex flex-col lg:flex-row gap-4'>
                    <div className=' flex lg:hidden lg:col-span-6 p-1 flex-row gap-4'>
                        <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2'>
                            <TextBody color={'var(--primary-color)'}>$ 186</TextBody>
                            <TextBody>Main</TextBody>
                        </div>
                        <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2 bg-slate-100'></div>
                        <div className='h-32 w-24 rounded-md border flex justify-center items-center flex-col gap-2'>
                            <TextBody color={'var(--primary-color)'}>$ 210</TextBody>
                            <TextBody>Business</TextBody>
                        </div>
                        <div className='h-32 w-24 bg-slate-100 rounded-md border flex justify-center items-center flex-col gap-2'></div>
                        <div className='h-32 w-24 bg-slate-100 rounded-md border flex justify-center items-center flex-col gap-2'></div>
                    </div>
                    <div className='flex flex-col gap-2 min-w-40'>
                        <TextBody>Service Type:</TextBody>
                        <TextBody color={'var(--primary-color)'} >{serviceType}</TextBody>
                    </div>
                    <div className='flex flex-col gap-2 min-w-40'>
                        <TextBody>City:</TextBody>
                        <TextBody color={'var(--primary-color)'} >{city}</TextBody>
                    </div>
                    <div className='flex flex-col gap-2 min-w-40'>
                        <TextBody>Direction:</TextBody>
                        <TextBody color={'var(--primary-color)'} >{direction}</TextBody>
                    </div>
                    <div className='flex flex-col gap-2 min-w-40'>
                        <TextBody>Code:</TextBody>
                        <TextBody color={'var(--primary-color)'} >{code}</TextBody>
                    </div>
                    <div className='flex flex-col gap-2 min-w-40'>
                        <TextBody>Flight Number:</TextBody>
                        <TextBody color={'var(--primary-color)'} >{number}</TextBody>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyFlightCard;
