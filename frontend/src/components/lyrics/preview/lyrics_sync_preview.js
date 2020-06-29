import React, {useState, useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router-dom';
import VideoPlayer from 'components/video_player/video_player'
export default ({syncedLyrics}) => {
  const {y, g} = useParams()
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [duration, setDuration] = useState(0)
  const [started, setStarted] = useState(false)

  //create a listener for the duration of the video
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(playerRef.current.getCurrentTime())
    }, 10);
    return () => clearInterval(interval);
  }, [])

  //used by the arrows to jump forwards and backwards.
  const incrementTime = (amount) => {
    playerRef.current.seekTo(duration + amount)
  }
  return (
    <Container fluid>
      <Row style={{position: 'relative'}} className="justify-content-md-center">
        <VideoPlayer ref={playerRef} fadeOut={true} playing={playing} url={`https://www.youtube.com/watch?v=${y}`} setDuration={setDuration} setStarted={setStarted} />
      </Row>
      <div style={{position: 'absolute', top: 0, left: '50%'}}>
        {started ? <p style={{position: 'relative', left: '-50%'}} >{duration ? `${Math.floor(duration)}` : null}</p> : null}
      </div>
      <Row xs={10} className="justify-content-md-center">
        {
          syncedLyrics.map((line) => {
            return line.filter((word, index) => {
              const diff = word.time - duration
              return 0 < diff && diff < 10 && index % 2 === 0
            })
              .map((word) => {
                debugger
                const diff = word.time - duration
                return (
                  <Col key={word.ordering} style={{marginLeft: `${diff * 10}%`, transition: ''}}>
                    <p style={{fontSize: '20px'}}>{word.text}</p>
                  </Col>
                )
              })
          })
        }
      </Row>
      <Row className="justify-content-md-center mh-50">
        <Col xs={1} className="align-self-center">
          <Button block style={{fontSize: '40px'}} onClick = {() => incrementTime(-10)}>
            🠐
          </Button>
        </Col>

        <Col className="align-self-center" xs={10} >
          <hr/>
        </Col>
        <Col className="align-self-center" xs={1} >
          <Button style={{fontSize: '40px'}} block  onClick = {() => incrementTime(10)}>
            🠒
          </Button>
        </Col>
      </Row>
      <Row>
        {
          syncedLyrics.map((line) => {
            return line.filter((word, index) => {
              const diff = word.time - duration
              return 0 < diff && diff < 10 && index % 2 === 1
            })
              .map((word) => {
                const diff = word.time - duration
                return (
                  <Col key={word.ordering} style={{marginLeft: `${diff * 10}%`, transition: 'margins: 0.5s'}}>
                    <p style={{fontSize: '20px'}}>{word.text}</p> 
                  </Col>
                )
              })
          })
        }
      </Row>
    </Container>
  )
}
