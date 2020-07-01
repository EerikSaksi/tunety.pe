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
export default function Preview({syncedLyrics}) {
  const {y, g} = useParams()
  //refers to the players (used to get and set the current playing time)
  const playerRef = useRef(null)

  const [duration, setDuration, getIncrementedDuration, displayDuration] = useDuration()
  const [playing, setPlaying] = useState(true)
  const [started, setStarted] = useState(false)
  const [playbackStatus] = usePlaybackStatus(started, playing, setPlaying)

  //create a listener for the duration of the video
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(playerRef.current.getCurrentTime())
      document.addEventListener("keydown", detectKey, false);
    }, 10);
    return () => clearInterval(interval);
  }, [])

  const detectKey = (event) => {
    if (event.code === 'Space') {
      setPlaying(playing => !playing)
    }
  }

  const incrementDuration = (amount) => {
    playerRef.current.seekTo(getIncrementedDuration(amount))
  }
  return (
    <Container fluid>
      {/* relatively positioned to allow for absolutely positioned container to display over*/}
      <Container style={{position: 'relative'}}>
        <Row style={{position: 'relative'}} className="justify-content-md-center">
          <VideoPlayer visible={false} ref={playerRef} playing={playing} url={`https://www.youtube.com/watch?v=${y}`} setDuration={setDuration} setStarted={setStarted} />
        </Row>
      </Container>

      {/* displays over the opacity 0 video */}
      <Container style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%'}}>
        <Row className="justify-content-md-center">
          <Col className='align-self-center' xs={1}>
            {playbackStatus}
          </Col>
          <Col xs={1}>
            <p className='align-self-center'> {displayDuration}</p>
          </Col>
        </Row>
        <Container style = {{height : '30%'}}>
          <LyricsTimeLine duration={duration} syncedLyrics={syncedLyrics} evenLyricsOnly={true} />
        </Container>
        <Container style = {{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
          <Row className="align-self-center">
            <Col xs={1} className="align-self-center">
              <Button block onClick={() => incrementDuration(-10)}>
                <Image style={{justifyContent: 'center', height: 20, transform: 'scaleX(-1)'}} src={require('fast_forwards.svg')}></Image>
              </Button>
            </Col>
            <Col className="align-self-center" xs={10} >
              <hr />
            </Col>
            <Col xs={1} className="align-self-center">
              <Button block onClick={() => incrementDuration(10)}>
                <Image style={{justifyContent: 'center', height: 20, }} src={require('fast_forwards.svg')}></Image>
              </Button>
            </Col>
          </Row>
        </Container>
        <Container style = {{position: 'absolute'}}>
          <LyricsTimeLine duration={duration} syncedLyrics={syncedLyrics} evenLyricsOnly={false} />
        </Container>
      </Container>
    </Container >
  )
}
