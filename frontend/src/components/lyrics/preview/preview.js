import React, {useState, useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router-dom';
import VideoPlayer from 'components/video_player/video_player'
import LyricsTimeLine from 'components/lyrics/preview/lyrics_timeline'
import {useDuration} from 'components/video_player/use_duration'
import {usePlaybackStatus} from 'components/video_player/use_playback_status'
import AnimatedP from 'components/universal/animated_p'
import CustomNavBar from 'components/universal/custom_navbar'
export default function Preview({syncedLyrics}) {
  const {y, g} = useParams()
  //refers to the players (used to get and set the current playing time)
  const playerRef = useRef(null)
  const skipForwardsRef = useRef(null)
  const skipBackwardsRef = useRef(null)

  //the passed prop is not mutable, so copy it to make it mutable
  const [mutableSyncedLyrics, setMutableSyncedLyrics] = useState(syncedLyrics)

  const [videoDuration, setVideoDuration, getIncrementedVideoDuration, displayVideoDuration] = useDuration()

  const [lyricChangeNotification, setLyricChangeNotification] = useState('')

  //given the unique id, set the time. this is used by the timeline and individual words to change the time
  const changeLyricById = (id, newTime) => {
    const formatTime = (time) => {
      return (`${Math.floor(time / 60)}:${time % 60 > 9 ? (time % 60).toFixed(2) : "0" + (time % 60).toFixed(2)}`)
    }
    setMutableSyncedLyrics(mutableSyncedLyrics =>
      mutableSyncedLyrics.map((line) => {
        return line.map((syncedLyric) => {
          if (syncedLyric.id === id) {
            setLyricChangeNotification(`'${syncedLyric.text}' ${formatTime(syncedLyric.time)} → ${formatTime(newTime)}`)
            return {...syncedLyric, time: newTime}
          }
          return syncedLyric
        })
      }))
  }

  const [playing, setPlaying] = useState(true)
  const [buffering, setBuffering] = useState(true)

  //create a listener for the videoDuration of the video
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoDuration(playerRef.current.getCurrentTime())
      document.addEventListener("keydown", detectKey, false);
    }, 500);
    return () => clearInterval(interval);
  }, [])

const detectKey = (event) => {
  if (event.code === 'Space') {
    setPlaying(playing => !playing)
  }
}

const incrementVideoDuration = (amount) => {
  playerRef.current.seekTo(getIncrementedVideoDuration(amount))
}


return (
  <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
    <CustomNavBar centerContent=
      {<Button block style={{color: 'black', height: '40px', textAlign: 'center', fontSize: playing ? 15 : 10}} onClick={() => setPlaying(!playing)}>{playing ? '►' : '▌▌'}</Button>} 
    />
    {/* relatively positioned to allow for absolutely positioned container to display over*/}
    <Container style={{position: 'relative'}}>
      <Row style={{position: 'relative'}}>
        <VideoPlayer visible={false} ref={playerRef} playing={playing} setBuffering={setBuffering} url={`https://www.youtube.com/watch?v=${y}`} setVideoDuration={setVideoDuration} />
      </Row>
    </Container>
    {/* displays over the opacity 0 video */}
    <Container fluid style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      <Row className="justify-content-center h-10">
        <Col xs={5}>
        </Col>
        <Col className='align-self-center' xs={1}>
          <Button disabled={buffering} onClick={() => setPlaying(playing => !playing)}>
          </Button>
        </Col>
        <Col className='align-self-center' xs={1} >
          <p style={{fontSize: '30px', marginBottom: 0}} className='align-self-center'> {displayVideoDuration}</p>
        </Col>
        <Col style={{alignSelf: 'center', fontSize: '20px'}} xs={5}>
          <AnimatedP text={lyricChangeNotification} fadeOut={true} />
        </Col>
      </Row>
      <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={true} />
      <Container fluid className="mw-100 h-10">
        <Row className="align-self-center">
          <Col xs={1} className="align-self-center">
            <Button ref={skipBackwardsRef} disabled={buffering} block onClick={() => {incrementVideoDuration(-10); skipBackwardsRef.current.blur()}}>
              <Image style={{justifyContent: 'center', height: 20, transform: 'scaleX(-1)'}} src={require('fast_forwards.svg')}></Image>
            </Button>
          </Col>
          <Col className="align-self-center" xs={10} >
            <hr />
          </Col>
          <Col xs={1} className="align-self-center">
            <Button ref={skipForwardsRef} disabled={buffering} block onClick={() => {incrementVideoDuration(10); skipForwardsRef.current.blur()}}>
              <Image style={{justifyContent: 'center', height: 20, }} src={require('fast_forwards.svg')}></Image>
            </Button>
          </Col>
        </Row>
      </Container>
      <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={false} />
    </Container>
  </Container >
)
}
