import React from 'react';
import videojs from 'video.js';

import VideoJS from '../utils/VideoJS'

// import Video from '../static/sample_20mb.mp4';
// import Video from 'https://res.cloudinary.com/drbi0gcur/video/upload/1711196097233-SampleVideo_1280x720_20mb_kgpogq.mp4';

const Player = () => {
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [
            {
                src: 'https://res.cloudinary.com/drbi0gcur/video/upload/q_100/v1711288022/1711288010666-Sample_1080p_seujcd.mp4',
                type: 'video/mp4',
                label: '1080p',
            },
            {
                src: 'https://res.cloudinary.com/drbi0gcur/video/upload/q_60/v1711288022/1711288010666-Sample_1080p_seujcd.mp4',
                type: 'video/mp4',
                label: '720p',
            },
            {
                src: 'https://res.cloudinary.com/drbi0gcur/video/upload/q_30/v1711288022/1711288010666-Sample_1080p_seujcd.mp4',
                type: 'video/mp4',
                label: '540p',
            },
            {
                src: 'https://res.cloudinary.com/drbi0gcur/video/upload/q_15/v1711288022/1711288010666-Sample_1080p_seujcd.mp4',
                type: 'video/mp4',
                label: '360p',
            },
            {
                src: 'https://res.cloudinary.com/drbi0gcur/video/upload/q_auto/v1711288022/1711288010666-Sample_1080p_seujcd.mp4',
                type: 'video/mp4',
                label: 'auto',
                selected: true,
            },
        ]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <>
            <div>Rest of app here</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "800px" }}>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </div>
            </div>
            <div>Rest of app here</div>
        </>
    );
}

export default Player;