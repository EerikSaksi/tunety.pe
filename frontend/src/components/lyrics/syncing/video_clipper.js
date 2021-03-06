import React, { useState, useRef, lazy, Suspense, useEffect } from 'react';
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
import useWindowSize from '@rehooks/window-size';
import Alert from 'react-bootstrap/Alert';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'components/lyrics/syncing/video_clipper.css';
import ReactPlayer from 'react-player';
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


  //these will be used if the youtubeVideoDate.duration can not be fetched due to lacking quota
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")

  //fetch the total video duration so that can clip the video and move the cursor about
  const { data: { youtubeVideoData } = {}, loading } = useQuery(YOUTUBE_VIDEO_DATA, {
    variables: { id: youtubeID },
  });

  const { innerWidth, innerHeight } = useWindowSize();

  //const data = {"youtubeVideoData": {"duration": 272}}
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [buffering, setBuffering] = useState(true);

  const [videoDuration, setVideoDuration] = useState(0);
  const [draggingPin, setDraggingPin] = useState(false);
  const playerRef = useRef();
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

  if (loading) {
    return <Loading centered />;
  }


  //run out of youtube quota, so ask the user
  if (youtubeVideoData.duration === -1) {
    const submitValues = () => {
      try{
        const newDuration = parseInt(minutes) * 60 + parseInt(seconds)
        youtubeVideoData.duration = newDuration
      }
      catch(error){
      }
    }
    return (
      <>
        <CustomNavBar />
        <Alert
          variant='primary'
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <Alert.Heading>
            I have run out of YouTube data fetches, so you need to manually insert the video duration.
          </Alert.Heading>
          <Form onSubmit = {e => e.preventDefault()}>
            <Row style={{ justifyContent: 'center' }}>
              <Form.Control placeholder='mm' onChange = {(e) => setMinutes(e.target.value)}/>
              <p style={{ verticalAlign: 'middle', fontSize: 30 }}>:</p>
              <Form.Control placeholder='ss' onChange = {(e) => setSeconds(e.target.value)}/>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Button onClick = {() => submitValues()}> Submit </Button>
            </Row>
          </Form>
        </Alert>
      </>
    );
  }

  if (submitted) {
    return (
      <Suspense fallback={<Loading centered />}>
        <LyricsSyncCreator
          startTime={(leftPixelOffset / (0.8 * innerWidth)) * youtubeVideoData.duration}
          endTime={((0.8 * innerWidth - rightPixelOffset) / (0.8 * innerWidth)) * youtubeVideoData.duration}
        />
      </Suspense>
    );
  }

  //used to convert screen pixels in to client pixels (by multiplying screen pixels by the ratio)
  const screenToClient = (event, pixels) => pixels * (event.clientX / event.screenX);

  //convert pixels to time
  const pixelsToTime = (clientPixels) => {
    //convert the moved pixels to a ratio by dividing it by the total length
    const movementRatio = clientPixels / (innerWidth * 0.8);

    //multiply the total video duration by the above ratio to get the movement in time
    return youtubeVideoData.duration * movementRatio;
  };

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CustomNavBar
        centerContent={
          <p style={{ fontSize: 30, color: 'white', zIndex: 1000, textAlign: 'center' }}>
            Shrink the timeline from left to right to clip parts with no lyrics
          </p>
        }
      />
      <Navbar style={{ height: 60, maxWidth: '100%' }} fixed='bottom' bg='secondary' variant='dark'>
        <Navbar.Collapse
          style={{ position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%' }}
        ></Navbar.Collapse>
        <Button
          disabled={buffering}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            color: 'black',
            height: '40px',
            textAlign: 'center',
          }}
          onClick={() => setPlaying((playing) => !playing)}
        >
          <Image style={{ height: 30, width: 30 }} src={playing ? pauseIcon : playIcon} />
        </Button>
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => setSubmitted(true)}> Finish clipping </Button>
        </Navbar.Collapse>
      </Navbar>
      <ReactPlayer
        ref={playerRef}
        playing={playing}
        url={`https://www.youtube.com/watch?v=${youtubeID}`}
        style={{
          minWidth: '80%',
          minHeight: innerHeight - 220,
          position: 'absolute',
          left: '50%',
          top: 60,
          transform: 'translate(-50%, 0)',
        }}
        onBuffer={() => {
          setBuffering(true);
        }}
        onBufferEnd={() => {
          setBuffering(false);
        }}
      />
      <DraggableCore
        axis={'x'}
        onStart={(event) => {
          const { clientX } = event;
          //check if the drag started from the leftmost part in which case drag events shrink
          if (clientX - leftPixelOffset - innerWidth * 0.1 < innerWidth * 0.02) {
            setShrinkingFromLeft(true);
          }
          //same idea, but width * 0.9 - rightPixelOffset is equal to the left offset of the rightmost point
          else if (innerWidth * 0.9 - rightPixelOffset - clientX < innerWidth * 0.02) {
            setShrinkingFromLeft(false);
          }
        }}
        onDrag={(event) => {
          //range check
          if (0.1 * innerWidth <= event.clientX && event.clientX <= 0.9 * innerWidth) {
            if (shrinkingFromLeft) {
              //check if the moving pin is out of range of leftPixelOffset or
              const newLeftOffset = leftPixelOffset + screenToClient(event, event.movementX);
              const leftOffsetTime = pixelsToTime(newLeftOffset);
              if (videoDuration < leftOffsetTime) {
                setDraggingPin(true);
                setVideoDuration(leftOffsetTime);
              }
              setLeftPixelOffset(newLeftOffset);
            } else {
              //check if the moving pin is out of range of leftPixelOffset or
              const newRightOffset = rightPixelOffset - screenToClient(event, event.movementX);
              const rightOffsetTime = pixelsToTime(newRightOffset);
              if (rightOffsetTime < videoDuration) {
                setDraggingPin(true);
                setVideoDuration(rightOffsetTime);
              }
              setRightPixelOffset(newRightOffset);
            }
          }
        }}
        onStop={(event) => {
          playerRef.current.seekTo(videoDuration);
          setDraggingPin(false);
        }}
      >
        <Button
          style={{
            position: 'absolute',
            width: `calc(80% - ${leftPixelOffset + rightPixelOffset}px)`,
            height: 80,
            left: `calc(10% + ${leftPixelOffset}px})`,
            right: `calc(10% + ${rightPixelOffset}px)`,
            bottom: 60,
          }}
        ></Button>
      </DraggableCore>
      <div
        style={{
          position: 'absolute',
          transition: 'all linear 40ms',
          left: `${(videoDuration / youtubeVideoData.duration) * 80 + 10}%`,
          height: 120,
          bottom: 60,
        }}
      >
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
            setVideoDuration((videoDuration) => {
              //new time is old time movement converted to time
              const newTime = videoDuration + pixelsToTime(screenToClient(event, event.movementX));

              //if in range set new time, otherwise old time
              if (0 < newTime && newTime < youtubeVideoData.duration) {
                return newTime;
              } else {
                return videoDuration;
              }
            });
          }}
        >
          <Button
            variant='danger'
            style={{ position: 'absolute', height: 20, width: 20, bottom: 80, transform: 'translate(-10px, 0px)' }}
          ></Button>
        </DraggableCore>
        <div
          style={{ position: 'absolute', width: 3, height: 80, backgroundColor: 'black', zIndex: 1000, bottom: 0 }}
        ></div>
      </div>
    </Container>
  );
}
