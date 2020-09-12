import React, { useState, useEffect, useRef, forwardRef } from 'react';
import rickSync from 'components/lyrics/syncing/rick_astley';
import CustomCard from 'components/universal/custom_card';
import ReactPlayer from 'react-player';
import { useInView } from 'react-hook-inview';
export default function AstleyCard({ setAstleyVideoDuration, videosInView, setInViewByKey}) {
  const [index, setIndex] = useState(0);
  const [overlay, setOverlay] = useState('');
  const playerRef = useRef();
  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView) {
      setInViewByKey('musicVideo', true)
    } else {
      setInViewByKey('musicVideo', false)
    }
    const interval = setInterval(() => {
      if (playerRef.current) {
        const videoDuration = playerRef.current.getCurrentTime()
        if (videoDuration > rickSync[index].time) {
          setOverlay(rickSync[index].text)
          setIndex(index => index + 1)
        }
        if (videoDuration < 16) {
          playerRef.current.seekTo(17)
        }
        setAstleyVideoDuration(videoDuration)
      }
    }, 10);
    return () => clearInterval(interval);
  }, [inView, index]);
  return (
    <CustomCard inView={inView}>
      <p style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', fontSize: 40, textAlign: 'center', color: 'white', zIndex: 1000 }}>First, we take a video with synchronized lyrics</p>
      <div ref={inViewRef} style={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer controls = {false} ref={playerRef} playing={Object.keys(videosInView).some(video => videosInView[video])} url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} style={{ minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0 }} controls={false} />
      </div>
      <p style={{ fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)' }}>{overlay}</p>
    </CustomCard>
  );
}
