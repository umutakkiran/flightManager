import React from 'react'
import { TextBody } from '../shared/Texts/Texts'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function FlightBar() {
    return (
        <div className=' w-full h-auto flex flex-row justify-between p-6 bg-white rounded-3xl'>
            <div className=' flex flex-row gap-4'>
                <div className=' border rounded-md flex justify-center items-center p-2'>
                    <TextBody>
                        All Flights
                    </TextBody>
                </div>
                <div className=' border rounded-md flex justify-center items-center p-2'>
                    <TextBody>
                        Past Flights
                    </TextBody>
                </div>
                <div className=' border rounded-md flex justify-center items-center p-2'>
                    <TextBody>
                        Future Flights
                    </TextBody>
                </div>
                <div className=' flex flex-row gap-2 items-center'>
                    <TextBody color={'var(--primary-color)'}>Edit Search</TextBody>
                    <KeyboardArrowDownIcon sx={{fontSize:16}} style={{ color: 'var(--primary-color)' }} />
                </div>
            </div>

        </div>
    )
}

export default FlightBar