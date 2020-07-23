import React, {useState, useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SyncedLyricMapper from 'components/lyrics/playing/synced_lyric_mapper'
import VideoPlayer from 'components/video_player/video_player'
import {useParams} from "react-router-dom";
import CustomNavBar from 'components/universal/custom_navbar'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import Loading from 'components/universal/loading'
import {useHistory} from "react-router-dom";

const SYNCED_LYRIC_QUERY = gql`
query syncedlyrics($youtubeID: String, $geniusID: String){
  syncedLyrics(youtubeID: $youtubeID, geniusID: $geniusID){
    text
    time
    id
  }
}`

export default function GameEntry() {
  const {youtubeID, geniusID} = useParams()


  const {data, error} = useQuery(SYNCED_LYRIC_QUERY, {
    variables: {youtubeID: youtubeID, geniusID: geniusID},
  })


  const history = useHistory()

  const playerRef = useRef()
  const [input, setInput] = useState('')
  const clearInput = () => {
    setInput('')
  }
  const [buffering, setBuffering] = useState(true)
  const [ended, setEnded] = useState(false)
  const [videoDuration, setVideoDuration] = useState(true)
  const [focused, setFocused] = useState(false)

  const formRef = useRef()

  //create time listener, and form focuser
  useEffect(() => {
    const interval = setInterval(() => {
      if (formRef.current) {
        formRef.current.focus()
      }
      if (playerRef.current) {
        setVideoDuration(playerRef.current.getCurrentTime())
      }
    }, 10);


    //const sleepAndJump = async() => {
    //  await new Promise(resolve => setTimeout(resolve, 1000));
    //  playerRef.current.seekTo(55)
    //}
    //sleepAndJump()
    return () => clearInterval(interval) 
  }, [])

  if (!youtubeID || !geniusID) {
    return ('Invalid URL: Missing either a youtubeID or a geniusID')
  }

  console.log(data)
  return(
    < >
    {
        error
          ?
            <Row className="justify-content-md-center">
              <Button onClick={() => history.push(`/s/${youtubeID}/${geniusID}`)}>
                <p>Create synchronization for this song and video.</p>
              </Button>
            </Row>
          :
    
        data !== undefined && data.syncedLyrics !== undefined
          ? 
          < >
          <Row>
            <Form style={{position: 'absolute', bottom: 0, left: '50%', width: 800, transform: 'translate(-50%, 0%)', fontSize: 100}} onChange={(e) => setInput(e.target.value)}>
              <Form.Control ref={formRef} style={{fontSize: 40}} />
            </Form>
          </Row>
          <VideoPlayer ref={playerRef} visible={true} fadeOut={true} url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={true} setBuffering={setBuffering} setEnded={setEnded} />
          <SyncedLyricMapper input={input} syncedLyrics={data ? data.syncedLyrics : null} videoDuration={videoDuration} clearInput = {clearInput}/>
          </>
          : 
            < >
              <Row style = {{justifyContent:'center'}}>
                <p>
                Loading lyrics
              </p>
              </Row>
              <Row style = {{justifyContent:'center'}}>
                <Loading/>
              </Row>
            </>
    
    }
    </>
      
  )
}

  /*
  return (
    < >
      <CustomNavBar />

        error
          ?
      <Row className="justify-content-md-center">
        <Button onClick={() => history.push(`/s/${youtubeID}/${geniusID}`)}>
          <p>Create synchronization for this song and video.</p>
        </Button>
      </Row>
          :
      
        data !== undefined && data.syncedLyrics !== undefined
          ?
          < >
          <Row>
            <Form style={{position: 'absolute', bottom: 0, left: '50%', width: 800, transform: 'translate(-50%, 0%)', fontSize: 100}} onChange={(e) => setInput(e.target.value)}>
              <Form.Control ref={formRef} style={{fontSize: 40}} />
            </Form>
          </Row>
          <VideoPlayer ref={playerRef} visible={true} fadeOut={true} url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={playing} setBuffering={setBuffering} setEnded={setEnded} />
          <SyncedLyricMapper input={input} syncedLyrics={data.syncedLyrics} videoDuration={videoDuration} />
          </>

          :
          <Row style={{justifyContent: 'center'}}>
            <Loading />
          </Row>
      
    </>
  );
} */ 


//        <CustomNavBar centerContent = {<p>
//          {`${Math.floor(videoDuration / 60)}:${videoDuration % 60 >= 10 ? Math.floor(videoDuration) % 60 : "0" + Math.floor(videoDuration) % 60}`
//}
//  </p>
//}/>
