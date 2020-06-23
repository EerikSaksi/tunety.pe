import React, {useState, useEffect} from 'react';
import VideoPlayer from './video_player'
import {useParams} from "react-router-dom";
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Loading from './loading'
import Card from 'react-bootstrap/Card'
import AnimatedP from './animated_p'

const GET_PROCESSED_LYRICS = gql`
query processedlyrics($id: String){
  processedLyrics(id: $id)
}`

export default function LyricsSyncCreator() {
  const {y, g} = useParams()

  const [startingTime, setStartingTime] = useState(0)

  //saves the current index of the word on which we are
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  //saves the word and the time since the last word was synced {text, sleepAfter}. The initial timeStamp is a null word that simply denotes the length before the first lyric
  const [wordTimestamps, setWordTimestamps] = useState([{text: '', time: 0}])
  //called whenever a word is synced
  const syncWord = (word) => {
    //increment index
    setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)

    //add the elapsed time and current word to the timestamp words mapping
    setWordTimestamps(wordTimestamps => wordTimestamps.concat(({text: word, time: (Date.now() - startingTime)})))
  }
  //used to tell the user what to do
  const [instructions, setInstructions] = useState("Waiting for lyrics to be processed...")

  //used to tell Video Player to start playing the song
  const [playing, setPlaying] = useState(false);

  const [keyPresses, setKeyPresses] = useState(0)
  //once the processed lyrics have been loaded, start listening to key presses
  const {data} = useQuery(GET_PROCESSED_LYRICS, {
    variables: {id: g},
    onCompleted: (() => {
      document.addEventListener("keydown", detectKey, false);
      setInstructions("Press any key to the start the video and synchronization")
    })
  })

  //used to trigger useEffect (boolean hooks always seem to be their initial value inside functions)
  const detectKey = ((event) => {
    if (event.keyCode) {
      setKeyPresses(keyPresses => setKeyPresses(keyPresses + 1))
    }
  })

  useEffect(() => {
    if (keyPresses !== 0) {
      if (!playing) {
        setPlaying(true)
      }
      //if the video has started and a key was pressed, sync the current word
      else if (startingTime) {
        syncWord(data.processedLyrics[currentWordIndex])
      }
    }
  }, [keyPresses])


  //when the startingTime has been set to a nonzero value by the video player the video has started playing 
  useEffect(() => {
    if (startingTime) {
      setInstructions("Press any key to synchronize one word")
    }
  }, [startingTime])

  return (
    <Container xs={1}>
      <Row className="justify-content-md-center">
        <Card>
          <AnimatedP text={instructions} />
        </Card>
      </Row>
      <Row className="justify-content-md-center">
        <VideoPlayer fadeOut={false} playing={playing} setStartingTime={setStartingTime} url={`https://www.youtube.com/watch?v=${y}`} />
      </Row>
      <Row className="justify-content-md-center">
        {data
          ? data.processedLyrics.map((word, index) => {
            return (
              <p key={index} style={{fontSize: '40px', marginLeft: '10px', color: index === currentWordIndex ? 'green' : 'black'}}>{word}</p>
            )
          })
          : <Loading />
        }
      </Row>
    </Container>
  )
}