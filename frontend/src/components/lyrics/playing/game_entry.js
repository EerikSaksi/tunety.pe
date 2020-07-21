import React, {useState} from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import SyncedLyricMapper from 'components/lyrics/playing/synced_lyric_mapper'
import VideoPlayer from 'components/video_player/video_player'
export default function GameEntry({syncedLyrics, youtubeID}) {
  //'background': `linear-gradient(to right, green ${accuracy}%, red ${accuracy}%)`,
  const [input, setInput] = useState('')
  const [playing, setPlaying] = useState(false)
  const [buffering, setBuffering] = useState(true)
  return (
    <Container style = {{height: 1000}} fluid>
      <Row  >
        <Form style = {{position: 'absolute', bottom: 0, left: '50%',   width: 800, transform: 'translate(-50%, 0%)', fontSize: 100}} onChange={(e) => setInput(e.target.value)}>
          <Form.Control/>
        </Form>
      </Row>
    </Container>
  );
}

//<SyncedLyricMapper input={input} syncedLyrics={syncedLyrics} />
//<VideoPlayer visible={true} fadeOut={true} playing={playing} setBuffering={setBuffering} url={`https://www.youtube.com/watch?v=${youtubeID}`} />
