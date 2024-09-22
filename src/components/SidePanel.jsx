import React from 'react'
import carImage from '../assets/images/car.jpg';
import hotelImage from '../assets/images/otel.jpg';
import packageImage from '../assets/images/package.jpg';
import { TextDisplay } from '../shared/Texts/Texts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


function SidePanel() {
    return (
        <div className='flex flex-col w-full h-full gap-8'>
            <div className="relative rounded-3xl w-full border h-1/3 p-8 flex flex-col justify-end items-start gap-2" style={{ backgroundImage: `url(${carImage})` }}>
                <DirectionsCarIcon sx={{ fontSize: 32, color: "#ffffff" }} />
                <TextDisplay color={"#ffffff"}>Car Rentals</TextDisplay>
            </div>
            <div className="rounded-3xl w-full border h-1/3 p-8 flex flex-col justify-end items-start gap-2" style={{ backgroundImage: `url(${hotelImage})` }}>
                <HotelIcon sx={{ fontSize: 32, color: "#ffffff" }} />
                <TextDisplay color={"#ffffff"}>Hotels</TextDisplay>
            </div>
            <div className="rounded-3xl w-full border h-1/3 p-8 flex flex-col justify-end items-start gap-2" style={{ backgroundImage: `url(${packageImage})` }}>
                <BeachAccessIcon sx={{ fontSize: 32, color: "#ffffff" }} />
                <TextDisplay color={"#ffffff"}>Travel Packages</TextDisplay>
            </div>
        </div>
    )
}

export default SidePanel