import React, {useState, useRef} from 'react';
import VideoPlayer from 'components/video_player/video_player'
import CustomNavBar from 'components/universal/custom_navbar'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Button'
import {useParams} from "react-router-dom";

import pauseIcon from 'media/pause.png'
import playIcon from 'media/play-button.png'
export default function VideoClipper() {
  const {youtubeID} = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [playing, setPlaying] = useState(true)
  const playerRef = useRef()
  const [buffering, setBuffering] = useState(true)
  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
      <CustomNavBar />
      <Navbar style={{height: 60, maxWidth: '100%'}} fixed='bottom' bg='secondary' variant='dark'>
        <Navbar.Collapse style={{position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%'}}>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Button onClick={() => setSubmitted(true)}> Finish clipping </Button>
        </Navbar.Collapse>
      </Navbar>
      <div style={{position: 'relative', paddingTop: '56.25%'}} >
      <VideoPlayer ref={playerRef} visible={true} setBuffering={setBuffering} playing={playing} url={`https://www.youtube.com/watch?v=${youtubeID}`} disableControls={false} style = {{minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0}}/>
    </div>
      <Button disabled={buffering} style={{color: 'black', height: '40px', textAlign: 'center', }} onClick={() => setPlaying(playing => !playing)}>
        <Image style={{height: 30, width: 30}} src={playing ? pauseIcon : playIcon} />
      </Button>
    </Container>
  )
}
