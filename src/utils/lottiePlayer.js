import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { TextTitle } from '../shared/Texts/Texts';

const LottiePlayer = ({ animationData, loop, autoplay, onFinish, text }) => {
    const handleStopEvent = () => {
        console.log('Animasyon durdu.');
        if (onFinish) onFinish();  // onFinish fonksiyonu varsa çağır
    };

    const handlePlayEvent = () => {
        console.log('Animasyon oynatılıyor.');
    };

    return (
        <div className={autoplay && 'w-full h-full justify-center items-center z-20'}>
            {
                text &&
                <div className=' w-full flex justify-center items-center'>
                    <TextTitle>{text}</TextTitle>
                </div>
            }
            <Player
                autoplay={autoplay}
                loop={loop}
                src={animationData}
                style={{ height: '300px', width: '300px' }}
                onEvent={(event) => {
                    console.log(`Event received: ${event}`);
                    if (event === 'pause') {
                        handleStopEvent();
                    } else if (event === 'play') {
                        handlePlayEvent();
                    }
                }}
            />
        </div>
    );
};

export default LottiePlayer;
