import React, { useState, useEffect, useRef, forwardRef } from 'react';
import RickSync from 'components/lyrics/syncing/rick_astley';
import { useInView } from 'react-hook-inview';
import VideoCard from 'components/navigation/video_cards/video_card'
export default function () {
  const [index, setIndex] = useState(0);
  const [overlay, setOverlay] = useState('');
  const playerRef = useRef();
  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const videoDuration = playerRef.current.getCurrentTime();
        if (videoDuration > RickSync[index].time) {
          setOverlay(RickSync[index].text);
          setIndex((index) => index + 1);
        }
        if (videoDuration < 16) {
          playerRef.current.seekTo(17);
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [index, inView]);

  return (
    <div>
      <VideoCard inView = {inView} ref = {playerRef}>
        <>
          <p style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', fontSize: 40, textAlign: 'center', color: 'white', zIndex: 1000 }}>First, we take a video with synchronized lyrics</p>
          <p style={{ fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)' }}>{overlay}</p>
        </>
      </VideoCard>
    </div>
  );
}
