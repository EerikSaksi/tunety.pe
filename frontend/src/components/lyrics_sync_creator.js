import React, { useState, useRef } from 'react';
import VideoPlayer from './video_player'
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Loading from './loading'
import useSyncCreator from './hooks/use_sync_creator'

const GET_PROCESSED_LYRICS = gql`
query processedlyrics($id: String){
  processedLyrics(id: $id)
}`

export default function LyricsSyncCreator(){
  const {y, g} = useParams()

  const [setStartingTime, currentWordIndex, syncWord] = useSyncCreator()

  //whether native video controls are available (the video should not be playable even when available as lyrics might not be available)
  const [controls, setControls] = useState(false)

  //once the processed lyrics have been loaded, start listening to spaces 
  const {data} = useQuery(GET_PROCESSED_LYRICS,{
    variables: {id:g},
    onCompleted: (() => {
      document.addEventListener("keydown", detectSpace, false);
      setControls(true)
    })
  })
  const detectSpace = ((event) => {
    if (event.keyCode) {
      syncWord(data.processedLyrics[currentWordIndex])
    }
  })

  //used to start the video 
  const [playing, setPlaying] = useState(false);

  //called by the VideoPlayer to tell us that the video has started playing (as the video doesn't instantly start playing)
  const [started, setStarted] = useState(false);
  return (
    <Container xs = {1}>
    <Row className = "justify-content-md-center">
        <VideoPlayer ref = {videoRef} controls = {controls} playing = {playing} url = {`https://www.youtube.com/watch?v=${y}`} setStarted = {setStarted}/>
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
