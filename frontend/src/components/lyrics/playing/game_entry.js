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
const SYNCHRONIZATION_DATA = gql`
query synchronizationdata($youtubeID: String, $geniusID: String){
  synchronizationData(youtubeID: $youtubeID, geniusID: $geniusID){
    startTime
    endTime
  }
}`

export default function GameEntry() {
  const {youtubeID, geniusID} = useParams()


  const {data: {syncedLyrics} = {}, loading, error} = useQuery(SYNCED_LYRIC_QUERY, {
    variables: {youtubeID: youtubeID, geniusID: geniusID},
  })
  const {data: {startTime, endTime} = {}} = useQuery(SYNCHRONIZATION_DATA, {
    variables: {youtubeID, geniusID}
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

  const formRef = useRef()

  if (!youtubeID || !geniusID) {
    return ('Invalid URL: Missing either a youtubeID or a geniusID')
  }
  return (
    < >
      <CustomNavBar />
      {
        error
          ?
          <Row className="justify-content-md-center">
            <Button onClick={() => history.push(`/s/${youtubeID}/${geniusID}`)}>
              <p>Create synchronization for this song and video.</p>
            </Button>
          </Row>
          :

          !loading
            ?
            < >
              <Row>
                <Form style={{position: 'absolute', bottom: 0, left: '50%', width: 800, transform: 'translate(-50%, 0%)', fontSize: 100}} onChange={(e) => setInput(e.target.value)}>
                  <Form.Control className="shadow-lg" ref={formRef} style={{fontSize: 40}} autoFocus />
                </Form>
              </Row>
              <VideoPlayer ref={playerRef} visible={false} url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={true} setBuffering={setBuffering} setEnded={setEnded} setVideoDuration={setVideoDuration} startTime={startTime} endTime={endTime} />
              <SyncedLyricMapper input={input} syncedLyrics={loading ? [] : syncedLyrics} videoDuration={videoDuration} clearInput={clearInput} />
            </>
            :
            < >
              <Row style={{justifyContent: 'center'}}>
                <p>
                  Loading lyrics
              </p>
              </Row>
              <Row style={{justifyContent: 'center'}}>
                <Loading />
              </Row>
            </>

      }
    </>

  )
}
