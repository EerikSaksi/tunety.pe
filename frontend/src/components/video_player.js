import React, {useState} from 'react';
import ReactPlayer from 'react-player';
export default function VideoPlayer({fadeOut, url, playing, setStarted}){
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
      style={{pointerEvents: 'none', ...fadeOutStyles}}
      playing={playing}
      url={url}
      onPlay ={() => {
        setOpacity(0)
        setStarted(true)
      }}
    />
  )
}
