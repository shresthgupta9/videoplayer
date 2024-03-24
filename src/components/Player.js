import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import axios from 'axios';

import VideoJS from '../utils/VideoJS';

const insertStringInCloudinaryURL = (url, insertString) => {
    const pattern = /upload\/(v\d+\/)/;
    const replacement = `upload/${insertString}$1`;
    return url.replace(pattern, replacement);
}

const Player = () => {
    const [videoJsOptions, setVideoJsOptions] = useState(null)

    // const token = localStorage.getItem('accessToken');
    // const headers = { "Authorization": `JWT ${token}`, 'Content-Type': 'application/json' };

    const handleData = async () => {
        await axios.get(`${process.env.REACT_APP_HOST_NAME}/movie/watch`)
            .then(res => { return res.data })
            .then(data => {
                const options = {
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    playbackRates: [0.5, 1, 1.5, 2],
                    sources: [
                        {
                            src: data.data.url,
                            type: 'video/mp4',
                            label: '1080p',
                            selected: true,
                        },
                        {
                            src: insertStringInCloudinaryURL(data.data.url, "q_60/"),
                            type: 'video/mp4',
                            label: '720p',
                        },
                        {
                            src: insertStringInCloudinaryURL(data.data.url, "q_30/"),
                            type: 'video/mp4',
                            label: '540p',
                        },
                        {
                            src: insertStringInCloudinaryURL(data.data.url, "q_15/"),
                            type: 'video/mp4',
                            label: '360p',
                        },
                        {
                            src: insertStringInCloudinaryURL(data.data.url, "q_auto/"),
                            type: 'video/mp4',
                            label: 'auto',
                            selected: true,
                        },
                    ]
                };
                setVideoJsOptions(options)
                setLoading(false)

            });
    }

    const [loading, setLoading] = useState(true);

    const playerRef = React.useRef(null);

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

    useEffect(() => {
        handleData();
    }, [])

    return (
        <>
            <div>Rest of app here</div>
            {loading ?
                <div>loading</div> :
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "800px" }}>
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                    </div>
                </div>
            }

            <div>Rest of app here</div>
        </>
    );
}

export default Player;