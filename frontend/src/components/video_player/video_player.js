import React, {useState} from 'react';
import ReactPlayer from 'react-player';
const VideoPlayer = React.forwardRef(({visible, fadeOut, url, playing, setStarted, setEnded}, ref) => {
  //used to fade the video out
  const [opacity, setOpacity] = useState(0);

  //add styling for fadeout depending on the supplied boolean
  const opacityStyle =
    fadeOut
      ? {
        transition: 'opacity 0.5s',
        opacity: opacity
      }
      : 
        visible 
          ? {opacity : 1}
          : {opacity : 0}
     
  return (
    <ReactPlayer
      ref={ref}
      style={{pointerEvents: 'none', ...opacityStyle,}}
      url={url}
      playing={playing}
      onStarted={() => {

      }
      }
      onPlay={() => {
        setOpacity(0)
        setStarted(true)
      }}
      onEnded={() => {
        console.log('ended')
        setEnded(true)
      }}
      onPause={() => {
        setStarted(false)
      }}
    />
  )
})
export default VideoPlayer
