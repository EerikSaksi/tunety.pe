import React, { useState, useLayoutEffect, useRef, lazy, Suspense, useEffect } from 'react';
import VideoPlayer from 'components/video_player/video_player';
import CustomNavBar from 'components/universal/custom_navbar';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import pauseIcon from 'media/pause.png';
import playIcon from 'media/play-button.png';
import { DraggableCore } from 'react-draggable';
import Loading from 'components/universal/loading';
const LyricsSyncCreator = lazy(() => import('components/lyrics/syncing/lyrics_sync_creator.js'));

const YOUTUBE_VIDEO_DATA = gql`
  query($id: String) {
    youtubeVideoData(id: $id) {
      duration
    }
  }
`;

export default function VideoClipper() {
  const { youtubeID } = useParams();

  //fetch the total video duration so that can clip the video and move the cursor about
  const { data: { youtubeVideoData } = {}, loading} = useQuery(YOUTUBE_VIDEO_DATA, {
    variables: { id: youtubeID },
  });

  //const data = {"youtubeVideoData": {"duration": 272}}
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef();
  const [buffering, setBuffering] = useState(true);

  const [videoDuration, setVideoDuration] = useState(0);
  const [draggingPin, setDraggingPin] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', detectKey, false);
    const interval = setInterval(() => {
      if (!draggingPin && playerRef.current) {
        setVideoDuration(playerRef.current.getCurrentTime());
      }
    }, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', detectKey);
    };
  }, [playerRef, draggingPin]);

  const detectKey = (event) => {
    if (event.code === 'Space') {
      setPlaying((playing) => !playing);
    }
  };

  const [leftPixelOffset, setLeftPixelOffset] = useState(0);
  const [rightPixelOffset, setRightPixelOffset] = useState(0);

  //whether we are shrinking from the left or the right
  const [shrinkingFromLeft, setShrinkingFromLeft] = useState(false);

  //we need the width to convert the pixels to times and to determine whether left or right drag or simply a timeline move
  const rootRef = useRef();
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (rootRef.current) {
      setWidth(rootRef.current.offsetWidth);
    }
  }, []);

  if (loading){
    return <Loading centered/>
  }

  console.log(youtubeVideoData.duration)

  if (submitted) {
    return (
      <Suspense fallback={<Loading centered />}>
        <LyricsSyncCreator startTime={(leftPixelOffset / (0.8 * width)) * youtubeVideoData.duration} endTime={((0.8 * width - rightPixelOffset) / (0.8 * width)) * youtubeVideoData.duration} />
      </Suspense>
    );
  }

  return (
    <Container ref={rootRef} fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CustomNavBar centerContent={<p style={{ fontSize: 30, color: 'white', zIndex: 1000, textAlign: 'center' }}>Shrink the timeline from left to right to clip parts with no lyrics</p>} />
      <Navbar style={{ height: 60, maxWidth: '100%' }} fixed='bottom' bg='secondary' variant='dark'>
        <Navbar.Collapse style={{ position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%' }}></Navbar.Collapse>
        <Button disabled={buffering} style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)', color: 'black', height: '40px', textAlign: 'center' }} onClick={() => setPlaying((playing) => !playing)}>
          <Image style={{ height: 30, width: 30 }} src={playing ? pauseIcon : playIcon} />
        </Button>
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => setSubmitted(true)}> Finish clipping </Button>
        </Navbar.Collapse>
      </Navbar>
      <VideoPlayer ref={playerRef} visible={true} playing={playing} url={`https://www.youtube.com/watch?v=${youtubeID}`} setBuffering={setBuffering} style={{ minWidth: '80%', minHeight: window.innerHeight - 220, position: 'absolute', left: '50%', top: 60, transform: 'translate(-50%, 0)' }} />
      <DraggableCore
        axis={'x'}
        onStart={(event) => {
          const { clientX } = event;
          if (clientX - leftPixelOffset - width * 0.1 < width * 0.02) {
            setShrinkingFromLeft(true);
          }
          //same idea, but width * 0.9 - rightPixelOffset is equal to the left offset of the rightmost point
          else if (width * 0.9 - rightPixelOffset - clientX < width * 0.02) {
            setShrinkingFromLeft(false);
          }
        }}
        onDrag={(event) => {
          const { movementX, clientX, screenX } = event;
          //range check
          if (0.1 * width <= clientX && clientX <= 0.9 * width) {
            if (shrinkingFromLeft) {
              setLeftPixelOffset((leftPixelOffset) => leftPixelOffset + movementX * (clientX / screenX));
            } else {
              setRightPixelOffset((rightPixelOffset) => rightPixelOffset - movementX * (clientX / screenX));
            }
          }
        }}
      >
        <Button onDrag={(event) => console.log(event)} style={{ position: 'absolute', width: `calc(80% - ${leftPixelOffset + rightPixelOffset}px)`, height: 80, left: `calc(10% + ${leftPixelOffset}px})`, right: `calc(10% + ${rightPixelOffset}px)`, bottom: 60 }}></Button>
      </DraggableCore>
      <div style={{ position: 'absolute', transition: 'all linear 40ms', left: `${(videoDuration / youtubeVideoData.duration) * 80 + 10}%`, height: 120, bottom: 60 }}>
        <DraggableCore
          axis='x'
          onStart={() => {
            setDraggingPin(true);
          }}
          onStop={() => {
            setDraggingPin(false);
            playerRef.current.seekTo(videoDuration);
          }}
          onDrag={(event) => {
            const { movementX, clientX, screenX } = event;
            const pixelMovementClient = movementX * (clientX / screenX);
            const movementRatio = pixelMovementClient / (width * 0.8);
            const movementTime = youtubeVideoData.duration * movementRatio;

            setVideoDuration((videoDuration) => {
              const newTime = videoDuration + movementTime;
              //in range
              if (0 < newTime && newTime < youtubeVideoData.duration) {
                return newTime;
              } else {
                return videoDuration;
              }
            });
          }}
        >
          <Button variant='danger' style={{ position: 'absolute', height: 20, width: 20, bottom: 80, transform: 'translate(-10px, 0px)' }}></Button>
        </DraggableCore>
        <div style={{ position: 'absolute', width: 3, height: 80, backgroundColor: 'black', zIndex: 1000, bottom: 0 }}></div>
      </div>
    </Container>
  );
}
