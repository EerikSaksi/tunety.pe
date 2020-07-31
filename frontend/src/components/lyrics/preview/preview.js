import React, {useState, useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {useParams, useHistory} from 'react-router-dom';
import VideoPlayer from 'components/video_player/video_player'
import LyricsTimeLine from 'components/lyrics/preview/lyrics_timeline'

import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks';
import {useDuration} from 'components/video_player/use_duration'
import CustomNavbar from 'components/universal/custom_navbar'
import Navbar from 'react-bootstrap/Navbar'

import pauseIcon from 'media/pause.png'
import playIcon from 'media/play-button.png'

const POST_SYNCED_LYRICS = gql`
mutation postsyncedlyrics($syncedLyrics: [[InputSyncedLyric]], $youtubeID: String, $geniusID: String){
  postSyncedLyrics(syncedLyrics: $syncedLyrics, youtubeID: $youtubeID, geniusID: $geniusID)
}
`

export default function ({syncedLyrics, startTime, endTime}) {
  const {youtubeID, geniusID} = useParams()
  //refers to the players (used to get and set the current playing time)
  const playerRef = useRef(null)
  const skipForwardsRef = useRef(null)
  const skipBackwardsRef = useRef(null)
  const history = useHistory()

  //used to send and fnish the preview
  const [postSyncedLyrics] = useMutation(POST_SYNCED_LYRICS, {
    variables: {syncedLyrics: syncedLyrics, synchronizationData: {youtubeID, geniusID, startTime, endTime}},
    onCompleted: () => {
      setLyricsPosted(true)
    }
  })
  //the passed prop is not mutable, so copy it to make it mutable
  const [mutableSyncedLyrics, setMutableSyncedLyrics] = useState(syncedLyrics)

  const [videoDuration, setVideoDuration, getIncrementedVideoDuration, displayVideoDuration] = useDuration()

  //tells user what word changed from what time to the new time
  const [lyricChangeNotification, setLyricChangeNotification] = useState('')


  const [showAlert, setShowAlert] = useState(false)
  const [lyricsPosted, setLyricsPosted] = useState(false)


  //given the unique id, set the time. this is used by the timeline and individual words to change the time
  const changeLyricById = (id, newTime) => {
    const formatTime = (time) => {
      return (`${Math.floor(time / 60)}:${time % 60 >= 9 ? (time % 60).toFixed(2) : "0" + (time % 60).toFixed(2)}`)
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
      playerRef.current.seekTo(newTime - 2)
  }

  const [playing, setPlaying] = useState(true)
  const [buffering, setBuffering] = useState(true)
  const [jumped, setJumped] = useState(false)

  useEffect(() => {
    if (!jumped) {
      playerRef.current.seekTo(55)
      setJumped(true)
    }
  }, [buffering, jumped])
  //create a listener for the videoDuration of the video
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoDuration(playerRef.current.getCurrentTime())
      document.addEventListener("keydown", detectKey, false);
    }, 50);
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
      <CustomNavbar
        centerContent={
          <Navbar.Collapse>
            <Button disabled={buffering} style={{color: 'black', height: '40px', textAlign: 'center', }} onClick={() => setPlaying(playing => !playing)}>
              <Image style={{height: 30, width: 30}} src={playing ? pauseIcon : playIcon} />
            </Button>
            <Navbar.Text style={{fontSize: 30, marginLeft: 10}} > {displayVideoDuration}</Navbar.Text>
          </Navbar.Collapse>
        }
        customContent={
          <Navbar.Text style={{fontSize: 15}}>
            Icons made by <a href="https://www.flaticon.com/authors/elias-bikbulatov" title="Elias Bikbulatov"> Elias Bikbulatov</a>             from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
          </Navbar.Text>
        }
      />

      {/* relatively positioned to allow for absolutely positioned container to display over*/}
      <Container style={{position: 'relative'}}>
        <Row style={{position: 'relative'}}>
          <VideoPlayer visible={false} ref={playerRef} playing={playing} setBuffering={setBuffering} url={`https://www.youtube.com/watch?v=${youtubeID}`}  disableControls={true}  />
        </Row>
      </Container>
      {/* displays over the opacity 0 video */}
      <Container fluid style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <div style={{
          position: 'absolute', left: '50%', marginLeft: '-3px', top: 0, bottom: 0, borderLeft: '4px solid black'
        }}>
        </div >
        <Alert style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, }} show={showAlert} dismissible={true} onClose={() => setShowAlert(false)} variant={lyricsPosted ? "success" : "primary"}>
          {
            lyricsPosted
              ?
              < >
                <Alert.Heading>Success: lyrics saved!</Alert.Heading>
                <Button onClick={() => history.push(`/p/${youtubeID}/${geniusID}`)}> Play now!</Button>
              </>
              :
              < >
                <Alert.Heading style={{justifyContent: 'center'}}> Click the button below to confirm your submission </Alert.Heading>
                <Button onClick={() => postSyncedLyrics()}> Send Lyric Synchronization</Button>
              </>
          }
        </Alert>
        <Row className="justify-content-center h-10">
          <Col xs={5}>
          </Col>
          <Col className='align-self-center' xs={1} >
          </Col>
          <Col style={{alignSelf: 'center', fontSize: '20px'}} xs={5}>
          </Col>
        </Row>
        <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={true} playing = {playing} setPlaying = {setPlaying}/>
        <Container fluid className="mw-100 h-10">
          <Row className="align-self-center">
            <Col xs={1} className="align-self-center">
              <Button ref={skipBackwardsRef} disabled={buffering} block onClick={() => {incrementVideoDuration(-10); skipBackwardsRef.current.blur()}}>
                <Image style={{justifyContent: 'center', height: 30, transform: 'scaleX(-1)'}} src={require('media/fast-forward.png')}></Image>
              </Button>
            </Col>
            <Col className="align-self-center" xs={10} >
              <hr
                style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 2
                }} />
            </Col>
            <Col xs={1} className="align-self-center">
              <Button ref={skipForwardsRef} disabled={buffering} block onClick={() => {incrementVideoDuration(10); skipForwardsRef.current.blur()}}>
                <Image style={{justifyContent: 'center', height: 30, }} src={require('media/fast-forward.png')}></Image>
              </Button>
            </Col>
          </Row>
        </Container>
        <LyricsTimeLine videoDuration={videoDuration} syncedLyrics={mutableSyncedLyrics} changeLyricById={changeLyricById} aboveProgressBar={false}  playing = {playing} setPlaying = {setPlaying}/>
        <div style={{width: 1, backgroundColor: 'black', position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}}></div>
        <Navbar style={{height: 60, maxWidth: '100%'}} fixed='bottom' bg='secondary' variant='dark'>
          <Navbar.Collapse style={{position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%'}}>
            <Navbar.Text style={{fontSize: 40}} >
              {lyricChangeNotification}
            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={() => setShowAlert(true)}> Submit synchronization </Button>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container >
  )
}

