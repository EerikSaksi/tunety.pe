import React, { useState, useEffect } from 'react';
import VideoPlayer from './video_player'
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Loading from './loading'
import Card from 'react-bootstrap/Card'
import useSyncCreator from './hooks/use_sync_creator'
import AnimatedP from './animated_p'

const GET_PROCESSED_LYRICS = gql`
query processedlyrics($id: String){
  processedLyrics(id: $id)
}`

export default function LyricsSyncCreator(){
  const {y, g} = useParams()

  const [setStartingTime, currentWordIndex, syncWord] = useSyncCreator()

  //used to tell the user what to do
  const [instructions, setInstructions] = useState("Waiting for lyrics to be processed...")

  //used to tell Video Player to start playing the song
  const [playing, setPlaying] = useState(false);

  //called by the VideoPlayer to tell us that the video has started playing (as the video doesn't instantly start playing)
  const [started, setStarted] = useState(false);

  const [keyPresses, setKeyPresses] = useState(0)
  //once the processed lyrics have been loaded, start listening to key presses
  const {data} = useQuery(GET_PROCESSED_LYRICS,{
    variables: {id:g},
    onCompleted: (() => {
      document.addEventListener("keydown", detectKey, false);
      setInstructions("Press any key to the start the video and synchronization")
    })
  })

  //used to trigger useEffect (boolean hooks always seem to be their initial value inside functions)
  const detectKey = ((event) => {
    if (event.keyCode)
    {
      setKeyPresses(keyPresses => setKeyPresses(keyPresses + 1))
    }
  })
  useEffect(() => {
    if (keyPresses !== 0){
      if (!playing){
        setPlaying(true)
      }
      //if the video has started and a key was pressed, sync the current word
      else if (started){
        syncWord(data.processedLyrics[currentWordIndex])
      }
    }
  }, [keyPresses])

  //when the video has started pass the current time to the hook
  useEffect(() => {
    if (started){
      setStartingTime(Date.now())
    }
  }, [started])

  //listen to video player events and set the instructions accordingly
  useEffect(() => {
    if (started) {
      setInstructions("Press any key to synchronize one word")
    }
  }, [started])
  return (
    <Container xs = {1}>
      <Row className = "justify-content-md-center">
        <Card>
          <AnimatedP text = {instructions}/>
        </Card>
      </Row>
      <Row className = "justify-content-md-center">
        <VideoPlayer fadeOut = {false} playing = {playing} setPlaying = {setPlaying} url = {`https://www.youtube.com/watch?v=${y}`} setStarted = {setStarted}/>
      </Row>
      <Row className = "justify-content-md-center">
        { data
          ? data.processedLyrics.map((word, index) => {
            return (
              <p key = {index} style = {{fontSize: '40px', marginLeft: '10px', color: index === currentWordIndex ? 'green' : 'black'}}>{word}</p>
            )
          }) 
          : <Loading/>
        }
      </Row>
      
    </Container>
  )
}
