import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
const VideoPlayer = React.forwardRef(({visible, muted, url, playing, setBuffering, setEnded, setVideoDuration, disableControls, style, startTime, endTime}, ref) => {

  //create interval that sets time and if endTime is passed, listens to the end
  useEffect(() => {
    const interval = setInterval(() => {
      if (setVideoDuration && ref.current) {
        const currentTime = ref.current.getDuration()
        setVideoDuration(currentTime)
        if (endTime && currentTime > endTime) {
          setEnded(true)
        }
      }
    }, 10);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (ref.current) {
      ref.current.seekTo(startTime)
    }
  }, [ref.current])

  return (
    <ReactPlayer
      ref={ref}
      style={{pointerEvents: disableControls ? 'none' : 'auto', opacity: visible ? 1 : 0, ...style, }}
      url={url}
      playing={playing}
      muted={muted}
      controls={disableControls}
      onBuffer={() => {
        if (setBuffering) {
          setBuffering(true)
        }
      }}
      onBufferEnd={() => {
        if (setBuffering) {
          setBuffering(false)
        }
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
