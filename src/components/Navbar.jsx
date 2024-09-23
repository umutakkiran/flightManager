import React from 'react'
import { TextBody, TextDisplay } from '../shared/Texts/Texts'
import FlightIcon from '@mui/icons-material/Flight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className=' flex flex-col lg:flex-row justify-between'>
            <Link to="/">
            <div className=' flex flex-row gap-2 items-center'>
                <div className=' w-8 h-8 rounded-full bg-[#6420AA] relative'>
                    <FlightIcon className=' absolute -left-1' sx={{ fontSize: 32 }} style={{ color: '#ffffff', rotate: '90deg' }} />
                </div>
                <TextDisplay>Plane Scape</TextDisplay>
            </div>
            </Link>
            <div className=' flex flex-row gap-8 justify-between lg:justify-normal'>
                <div className=' flex flex-row gap-4'>
                    <div className=' flex flex-row gap-2 items-center'>
                        <LocalOfferIcon style={{ color: 'var(--primary-color)' }} />
                        <TextBody>
                            Deals
                        </TextBody>
                    </div>
                    <div className=' flex flex-row gap-2 items-center'>
                        <PublicIcon style={{ color: 'var(--primary-color)' }} />
                        <TextBody>
                            Discover
                        </TextBody>
                    </div>
                </div>
                <div className=' flex items-center gap-2'>
                    <div className=' w-8 h-8 rounded-full bg-black'>
                    </div>
                    <Link to="/flights">
                        <TextBody>
                            Umut Akkiran
                        </TextBody>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar