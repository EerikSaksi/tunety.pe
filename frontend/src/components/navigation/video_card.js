import React, {useState, useEffect, useRef} from 'react';
import VideoPlayer from 'components/video_player/video_player'
import RickSync from 'components/lyrics/syncing/rick_astley'
import CustomCard from 'components/universal/custom_card'
export default function VideoCard() {
  const [index, setIndex] = useState(0)
  const [overlay, setOverlay] = useState('')
  const playerRef = useRef()
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        if (playerRef.current.getCurrentTime() > RickSync[index].time) {
          setOverlay(RickSync[index].text)
          setIndex(index => index + 1)
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [index])
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(17)
    }
  }, [playerRef.current])
  return (
    <CustomCard title={'First, we take a video with synchronized lyrics'} waitBeforeFadeIn={500}>
      <div style={{position: 'relative', paddingTop: '56.25%'}} >
        <VideoPlayer ref = {playerRef} visible={true} playing={true} url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} muted={true} customStyle={{minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0}} />
      </div>
      <p style={{fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)'}}>
        {overlay}
      </p>
    </CustomCard>
  )
}
