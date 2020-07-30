import React, {useState} from 'react';
import ReactPlayer from 'react-player';
const VideoPlayer = React.forwardRef(({visible, fadeOut, url, playing, setBuffering, setEnded, disableControls, customStyle, muted }, ref) => {
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
        ? {opacity: 1}
        : {opacity: 0}

  return (
    <ReactPlayer
      ref={ref}
      style={{pointerEvents: 'none', ...opacityStyle, ...customStyle,  }}
      url={url}
      playing={playing}
      muted = {muted}
      controls={disableControls}
      onBuffer={() => {
        if (setBuffering){
          setBuffering(true)
        }
      }}

      onBufferEnd={() => {
        if (setBuffering){
          setBuffering(false)
        }
        setOpacity(0)
      }}
      onPlay={() => {
        setOpacity(0)
      }}
      onEnded={() => {
        if (setEnded) {
          setEnded(true)
        }
      }}
    />
  )
})
export default VideoPlayer
