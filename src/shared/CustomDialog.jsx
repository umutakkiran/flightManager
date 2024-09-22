import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FlightIcon from '@mui/icons-material/Flight';
import { TextDisplay } from './Texts/Texts';

function CustomDialog({ children, isOpen, setIsOpen }) {
    return (
        <div className={`fixed top-0 right-0 h-full overflow-y-auto bg-slate-100 backdrop-blur-sm bg-opacity-90 z-20 transition-all duration-500 xl:hidden ${isOpen ? 'w-full' : 'w-0 overflow-hidden'}`}>
            {
                isOpen &&
                <div className=' flex flex-col p-6 gap-2'>
                    <div className=' flex flex-row gap-2 items-center'>
                        <div className=' w-8 h-8 rounded-full bg-[#6420AA] relative'>
                            <FlightIcon className=' absolute -left-1' sx={{ fontSize: 32 }} style={{ color: '#ffffff', rotate: '90deg' }} />
                        </div>
                        <TextDisplay>Plane Scape</TextDisplay>
                    </div>
                    <div onClick={() => setIsOpen(false)} className=' absolute top-4 right-4'>
                        <CloseIcon />
                    </div>
                    {children}
                </div>


            }
        </div>
    )
}

export default CustomDialog
