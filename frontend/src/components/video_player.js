import React, {useState} from 'react';
import ReactPlayer from 'react-player';
export default function VideoPlayer({fadeOut, url, playing, setStartingTime}) {
  //used to fade the video out
  const [opacity, setOpacity] = useState(1);

  //add styling for fadeout depending on the supplied boolean
  const fadeOutStyles =
    fadeOut
      ? {
        transition: 'opacity 0.5s',
        opacity: opacity
      }
      : {}
  return (
    <ReactPlayer
      style={{pointerEvents: 'auto', ...fadeOutStyles}}
      playing={playing}
      url={url}
      onReady={() =>
        console.log('ready')
      }
      onPlay={() => {
        console.log('playing')
        setOpacity(0)
        setStartingTime(Date.now())
      }}
    />
  )
}
