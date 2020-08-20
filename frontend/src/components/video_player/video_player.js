import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
export default function VideoPlayer ({visible, muted, url, playing, setBuffering, setEnded, setVideoDuration, disableControls, style, startTime, endTime}){

  const playerRef = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      if (setVideoDuration && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime()
        setVideoDuration(currentTime)
        if (endTime && currentTime > endTime) {
          setEnded(true)
        }
      }
    }, 10);
    return () => clearInterval(interval)
  }, [endTime, playerRef, setEnded, setVideoDuration])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(startTime)
    }
  }, [startTime, playerRef])

  return (
    <ReactPlayer
      ref={playerRef}
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
}
export default VideoPlayer
