import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import CustomCard from 'components/universal/custom_card';
import { useInView } from 'react-hook-inview';

//wowa
export default function VideoCard({ astleyVideoDuration, url, topText, setInViewByKey, videoKey, syncOffset}) {
  const playerRef = useRef();
  //whether or not to sync with the music video in the onBufferEnd hook, needed as onBufferEnd is called after jumping time which creates an infinite onBufferEnd => sync time => onBufferEnd => sync time loop which makes the video stuttery
  const [catchUp, setCatchUp] = useState(true);
  const [initialSync, setInitialSync] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    //if being viewed then jump to new time
    if (inView) {
      setCatchUp(true);
      //alert the rick music video that it should play as a video is in view
      setInViewByKey(videoKey,true);
    } else {
      setInViewByKey(videoKey, false);
    }
  }, [inView]);
  return (
    <CustomCard inView={inView}>
      <p style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', fontSize: 40, textAlign: 'center', color: 'white', zIndex: 1000 }}>{topText}</p>
      <div ref={inViewRef} style={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer
          ref={playerRef}
          playing={catchUp || inView}
          url={url}
          style={{ minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0 }}
          controls={false}
          onBufferEnd={() => {
            if (!initialSync){
              //the initial sync seems to need to have a larger offset for some reason, so this is only called on the first sync
              setInitialSync(true)
              setCatchUp(false);
              playerRef.current.seekTo(astleyVideoDuration - syncOffset);
            }
            else if (catchUp){
              setCatchUp(false);
              playerRef.current.seekTo(astleyVideoDuration - syncOffset - 0.39);
            }
          }}
        />
      </div>
    </CustomCard>
  );
}
