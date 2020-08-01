import React, {useState, useEffect, useRef, forwardRef} from 'react';
import VideoPlayer from 'components/video_player/video_player'
import RickSync from 'components/lyrics/syncing/rick_astley'
import CustomCard from 'components/universal/custom_card'
import {useInView} from 'react-hook-inview'
const AstleyCard = forwardRef(({}, ref) => {
  const [index, setIndex] = useState(0)
  const [overlay, setOverlay] = useState('')
  const playerRef = useRef()
  const [inViewRef, inView] = useInView({
    threshold: 0.5
  })
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const videoDuration = playerRef.current.getCurrentTime()
        if (videoDuration > RickSync[index].time) {
          setOverlay(RickSync[index].text)
          setIndex(index => index + 1)
        }
        if (videoDuration < 16) {
          playerRef.current.seekTo(17)
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [index, inView])

  return (
    <CustomCard inView={inView} ref={ref}>
      <p style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', fontSize: 40, textAlign: 'center', color: 'white', zIndex: 1000, }}>
        First, we take a video with synchronized lyrics
        </p>
      <div ref={inViewRef} style={{position: 'relative', paddingTop: '56.25%'}} >
        <VideoPlayer ref={playerRef} visible={true} playing={inView} url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} style={{minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0}} />
      </div>

      <p style={{fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)'}}>
        {overlay}
      </p>
    </CustomCard>
  )
})
export default AstleyCard
