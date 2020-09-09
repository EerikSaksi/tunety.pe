import React, { useState, useRef, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import LyricsTimeLine from 'components/lyrics/preview/lyrics_timeline';

import { useMutation, gql } from '@apollo/client';
import CustomNavbar from 'components/universal/custom_navbar';
import Navbar from 'react-bootstrap/Navbar';

import pauseIcon from 'media/pause.png';
import playIcon from 'media/play-button.png';

const POST_SYNCED_LYRICS = gql`
  mutation postsyncedlyrics($syncedLyrics: [[InputSyncedLyric]], $synchronizationData: InputSynchronizationData,) {
    postSyncedLyrics(syncedLyrics: $syncedLyrics, synchronizationData: $synchronizationData,)
  }
`;


export default function Preview({ syncedLyrics, startTime, endTime }) {
  const { youtubeID, geniusID } = useParams();
  //refers to the players (used to get and set the current playing time)
  const playerRef = useRef(null);
  const skipForwardsRef = useRef(null);
  const skipBackwardsRef = useRef(null);
  const history = useHistory();

  //the passed prop is not mutable, so copy it to make it mutable
  const [mutableSyncedLyrics, setMutableSyncedLyrics] = useState(syncedLyrics);

  //set by the navbar component
  const [tokenId, setTokenId] = useState("")

  //set by the navbar component
  const [userName, setUserName] = useState("")

  //used to send and finish the preview
  const [postSyncedLyrics] = useMutation(POST_SYNCED_LYRICS, {
    variables: { syncedLyrics: mutableSyncedLyrics, synchronizationData: { youtubeID, geniusID, startTime, endTime, tokenId } },
    onCompleted: () => {
      setLyricsPosted(true);
    },
    skip: tokenId === ""
  });

  const [displayVideoDuration, setDisplayVideoDuration] = useState('');

  const [videoDuration, setVideoDuration] = useState(0);

  //tells user what word changed from what time to the new time
  const [lyricChangeNotification, setLyricChangeNotification] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [lyricsPosted, setLyricsPosted] = useState(false);

  const formatTime = (time) => {
    return `${Math.floor(time / 60)}:${time % 60 >= 10 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)}`;
  };

  //given the unique id, set the time. this is used by the timeline and individual words to change the time
  const changeLyricById = useCallback((id, newTime) => {
    setMutableSyncedLyrics((mutableSyncedLyrics) =>
      mutableSyncedLyrics.map((line) => {
        return line.map((syncedLyric) => {
          if (syncedLyric.id === id) {
            setLyricChangeNotification(`'${syncedLyric.text}' ${formatTime(syncedLyric.time)} → ${formatTime(newTime)}`);
            return { ...syncedLyric, time: newTime };
          }
          return syncedLyric;
        });
      })
    );
    //if the elements newTime is in range of -5 < videoDuration < 2, then jump to two seconds before the change to make previewing the new change easier
    if (videoDuration - newTime < 3 ){
      playerRef.current.seekTo(newTime - 2);
    }
  }, []);

  const [playing, setPlaying] = useState(true);
  const [buffering, setBuffering] = useState(true);

  //create a listener for the videoDuration of the video
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime < startTime) {
          playerRef.current.seekTo(startTime);
          setVideoDuration(startTime);
        }
        if (currentTime > endTime) {
          playerRef.seekTo(endTime);
          setVideoDuration(endTime);
          setPlaying(false);
        } else {
          setVideoDuration(currentTime);
        }
      }
      setDisplayVideoDuration(formatTime(videoDuration));
    }, 25);
    const detectKey = (event) => {
      if (event.code === 'Space') {
        setPlaying((playing) => {
          //the playing state should only be changed when the video is playable
          if (!buffering){
            return !playing
          }
          else{
            return playing
          }
        });
      }
    };
    window.addEventListener('keydown', detectKey, false);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', detectKey);
    };
  }, [endTime, setVideoDuration, startTime, videoDuration, buffering]);

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CustomNavbar
        setParentTokenId={setTokenId}
        setParentUserName={setUserName}
        centerContent={
          <Navbar.Collapse>
            <Button disabled={buffering} style={{ color: 'black', height: '40px', textAlign: 'center' }} onClick={() => setPlaying((playing) => !playing)}>
              <Image style={{ height: 30, width: 30 }} src={playing ? pauseIcon : playIcon} />
            </Button>
            <Navbar.Text style={{ fontSize: 30, marginLeft: 10 }}> {displayVideoDuration}</Navbar.Text>
          </Navbar.Collapse>
        }
        customContent={
          <Navbar.Text style={{ fontSize: 15 }}>
            Icons made by{' '}
            <a href='https://www.flaticon.com/authors/elias-bikbulatov' title='Elias Bikbulatov'>
              {' '}
              Elias Bikbulatov
            </a>{' '}
            from{' '}
            <a href='https://www.flaticon.com/' title='Flaticon'>
              {' '}
              www.flaticon.com
            </a>
          </Navbar.Text>
        }
      />

      {/* relatively positioned to allow for absolutely positioned container to display over*/}
      <Container style={{ position: 'relative' }}>
        <Row style={{ position: 'relative' }}>
          <ReactPlayer ref={playerRef} playing={playing} onBuffer={() => setBuffering(true)} onBufferEnd={() => setBuffering(false)} url={`https://www.youtube.com/watch?v=${youtubeID}`} controls={false} style={{ opacity: 0 }} />
        </Row>
      </Container>
      {/* displays over the opacity 0 video */}
      <Container fluid style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-3px',
            top: 0,
            bottom: 0,
            borderLeft: '4px solid black',
          }}
        ></div>
        <Alert style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }} show={showAlert} dismissible={true} onClose={() => setShowAlert(false)} variant={lyricsPosted ? 'success' : 'primary'}>
          {lyricsPosted ? (
            <>
              <Alert.Heading>Success: lyrics saved!</Alert.Heading>
              <Button onClick={() => history.push(`/play/${userName}/${youtubeID}/${geniusID}`)}> Play now!</Button>
            </>
          ) : (
            <>
              <Alert.Heading style={{ justifyContent: 'center' }}> Click the button below to confirm your submission </Alert.Heading>
              <Button onClick={() => postSyncedLyrics()}> Send Lyric Synchronization</Button>
            </>
          )}
        </Alert>
        <Row className='justify-content-center h-10'>
          <Col xs={5}></Col>
          <Col className='align-self-center' xs={1}></Col>
          <Col style={{ alignSelf: 'center', fontSize: '20px' }} xs={5}></Col>
        </Row>
        <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={true} playing={playing} setPlaying={setPlaying} />
        <Container fluid className='mw-100 h-10'>
          <Row className='align-self-center'>
            <Col xs={1} className='align-self-center'>
              <Button
                ref={skipBackwardsRef}
                disabled={buffering}
                block
                onClick={() => {
                  playerRef.current.seekTo(videoDuration - 10)
                  skipBackwardsRef.current.blur();
                }}
              >
                <Image style={{ justifyContent: 'center', height: 30, transform: 'scaleX(-1)' }} src={require('media/fast-forward.png')}></Image>
              </Button>
            </Col>
            <Col className='align-self-center' xs={10}>
              <hr
                style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 2,
                }}
              />
            </Col>
            <Col xs={1} className='align-self-center'>
              <Button
                ref={skipForwardsRef}
                disabled={buffering}
                block
                onClick={() => {
                  playerRef.current.seekTo(videoDuration + 10)
                  skipForwardsRef.current.blur();
                }}
              >
                <Image style={{ justifyContent: 'center', height: 30 }} src={require('media/fast-forward.png')}></Image>
              </Button>
            </Col>
          </Row>
        </Container>
        <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={false} playing={playing} setPlaying={setPlaying} />
        <div style={{ width: 1, backgroundColor: 'black', position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)' }}></div>
        <Navbar style={{ height: 60, maxWidth: '100%' }} fixed='bottom' bg='secondary' variant='dark'>
          <Navbar.Collapse style={{ position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%' }}>
            <Navbar.Text style={{ fontSize: 40 }}>{lyricChangeNotification}</Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <Button onClick={() => setShowAlert(true)}> Submit synchronization </Button>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
}
