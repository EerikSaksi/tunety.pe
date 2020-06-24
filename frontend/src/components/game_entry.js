import React, {useState} from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Container'
import SyncedLyricMapper from './synced_lyric_mapper'
import AnimatedP from './animated_p'

export default function ({syncedLyrics, y}) {
  //'background': `linear-gradient(to right, green ${accuracy}%, red ${accuracy}%)`,
  const [input, setInput] = useState('')
  const [playing, setPlaying] = useState(false)
  const [startingTime, setStartingTime] = useState(0)
  const [instructions, setInstructions] = useState('Press any key to start the game.')
  //on first press remove instruction and start the game
  const handleChange = (e) => {
    if (!gameStarted) {
      setPlaying(true)
      setInstructions(undefined)
    }
    //otherwise set the input to the form value
    else {
      setInput(e.target.value)
    }
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        {instructions}
      </Row>
      <Row className="justify-content-md-center" style={{bottom: 0}}>
        <Form onChange={(e) => handleChange}>
          <Form.Control />
        </Form>
      </Row>
      <SyncedLyricMapper startingTime={startingTime} input={input} syncedLyrics={syncedLyrics} />
      <VideoPlayer fadeOut={true} playing={playing} setStartingTime={setStartingTime} url={`https://www.youtube.com/watch?v=${y}`} />
    </Container>
  );
}
