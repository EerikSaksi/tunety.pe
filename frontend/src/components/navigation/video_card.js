import React, {useState, useEffect, useRef, forwardRef} from 'react';
import VideoPlayer from 'components/video_player/video_player'
import CustomCard from 'components/universal/custom_card'
import {useInView} from 'react-hook-inview'
const VideoCard = forwardRef(({children, youtubeID, setVideoDuration}, ref) => {
  const playerRef = useRef()
  const [inView, inViewRef] = useInView({
    threshold: 0.5
  })

  useEffect(() => {
    //if video duration listener was passed 
    var interval = undefined
    if (setVideoDuration) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const videoDuration = playerRef.current.getVideoDuration()
          setVideoDuration(videoDuration)
          if (videoDuration < 16) {
            playerRef.current.seekTo(17)
          }
        }
      }, 10);
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    };
  }, [])
  return (
    <CustomCard inView={inView}>
      <div ref={inViewRef} style={{position: 'relative', paddingTop: '56.25%'}} >
        <VideoPlayer ref={playerRef} visible={true} playing={inView} url={`https://www.youtube.com/watch?v=${youtubeID}`} style={{minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0}} />
      </div>
      {children}
    </CustomCard >
  )
})
export default VideoCard
