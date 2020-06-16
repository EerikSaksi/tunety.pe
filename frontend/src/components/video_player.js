import React, {useState} from 'react';
import ReactPlayer from 'react-player';
export default function VideoPlayer({url, playing, setStarted}){
  const [opacity, setOpacity] = useState(1);
  return (
    <ReactPlayer
      style={{transition: 'opacity 0.5s', opacity: opacity}}
      className='top_center'
      playing={playing}
      url={url}
      onStart={() => {
        setOpacity(0);
        setStarted(true)
      }}
    />
  )
}
