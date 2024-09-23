import React from 'react';
import { TextBody, TextDisplay } from '../shared/Texts/Texts';
import FlightIcon from '@mui/icons-material/Flight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
import Image from '../assets/images/vesikalik.jpg'

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col lg:flex-row justify-between'>
            <div onClick={() => navigate("/")} className='flex flex-row gap-2 items-center hover:cursor-pointer'>
                <div className='w-8 h-8 rounded-full bg-[#6420AA] relative'>
                    <FlightIcon className='absolute -left-1' sx={{ fontSize: 32 }} style={{ color: '#ffffff', rotate: '90deg' }} />
                </div>
                <TextDisplay>Plane Scape</TextDisplay>
            </div>
            <div className='flex flex-row gap-8 justify-between lg:justify-normal'>
                <div className='flex flex-row gap-4'>
                    <a href="https://github.com/umutakkiran?tab=repositories" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
                        <LocalOfferIcon style={{ color: 'var(--primary-color)' }} />
                        <TextBody>
                            Deals
                        </TextBody>
                    </a>
                    <a href="https://github.com/umutakkiran?tab=repositories" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
                        <PublicIcon style={{ color: 'var(--primary-color)' }} />
                        <TextBody>
                            Github Repo
                        </TextBody>
                    </a>
                </div>
                <div onClick={() => navigate("/flights")} className='flex items-center gap-2 hover:cursor-pointer'>
                    <div
                        className='w-8 h-8 rounded-full bg-black'
                        style={{
                            backgroundImage: `url(${Image})`, // Replace with your image URL
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <TextBody>
                        Umut Akkiran
                    </TextBody>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
