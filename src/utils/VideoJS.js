import React from 'react';
import videojs from 'video.js';

require('@silvermine/videojs-quality-selector')(videojs);
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css');

const VideoJS = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    console.log(props);
    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });

            // Do not change this!!!!!!!!!!
            player.controlBar.removeChild('playbackRateMenuButton');
            player.controlBar.removeChild('pictureInPictureToggle');
            player.controlBar.removeChild('fullscreenToggle');
            player.controlBar.addChild('QualitySelector');
            player.controlBar.addChild('playbackRateMenuButton');
            player.controlBar.addChild('pictureInPictureToggle');
            player.controlBar.addChild('fullscreenToggle');

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoJS;