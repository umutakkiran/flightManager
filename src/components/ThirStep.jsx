import React, { useEffect } from 'react'
import ThirdStepCard from './ThirdStepCard'
import { useSelector, useDispatch } from 'react-redux';
import { TextTitle } from '../shared/Texts/Texts';
import CustomButton from '../shared/CustomButton';
import { stepActions } from '../utils/slices/stepSlice';
import { bookedFlightsActions } from '../utils/slices/bookedFlightsSlice';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useAddMutate } from '../hooks/useGenericMutateHook';
import LottiePlayer from '../utils/lottiePlayer';
import successAnimation from '../assets/animations/success.json'
import { useNavigate } from "react-router-dom";


function ThirStep() {
    const navigate = useNavigate();
    const bookedFlights = useSelector((state) => state.bookedFlights);
    const dispatch = useDispatch();
    const [isPlaying, setIsPLaying] = React.useState(false);


    const { mutate, isPending, isSuccess } = useAddMutate()


    function cancelFlights() {
        dispatch(stepActions.changeStep(0));
        dispatch(bookedFlightsActions.refreshBookedFlights());
    }

    function approveFlights(flight) {
        const postData = {
            endpoint: `/api/tickets`,
            key: ["ticket"],
            data: { flight }
        }
        mutate(postData)
    }

    const handleRedirect = () => {
        setTimeout(() => {
            navigate("/flights");
        }, 600);

    };

    useEffect(() => {
        if (isSuccess) {
            setIsPLaying(true)
        }
    }, [isSuccess])

    return (
        <>
            {
                isPlaying ?
                    <LottiePlayer autoplay={isPlaying} animationData={successAnimation} loop={false} onFinish={handleRedirect} text={"Redirecting To Your Flights Page..."} />
                    :
                    <>
                        <div className=' flex flex-col gap-1'>
                            <div className=' flex flex-row gap-1'>
                                <AssignmentTurnedInIcon />
                                <TextTitle >
                                    Flights Approvement
                                </TextTitle>
                            </div>

                        </div>

                        <div className=' relative w-full flex flex-col gap-2'>
                            {bookedFlights.getBookedFlights?.map((flight, index) => (
                                <ThirdStepCard key={index} flight={flight} />
                            ))}
                        </div>
                        <div className=' flex flex-row gap-4'>
                            <CustomButton secondary={true} onClick={cancelFlights} label={"Cancel"} />
                            <CustomButton onClick={() => bookedFlights.getBookedFlights?.map((flight, index) => { approveFlights(flight) })} label={"Done"} />
                        </div>
                    </>
            }

        </>

    )
}

export default ThirStep