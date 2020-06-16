import React, { useState } from 'react';
import VideoPlayer from './video_player'
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const GET_PROCESSED_LYRICS = gql`
query processedlyrics($id: String){
  processedLyrics(id: $id)
}`
export default function LyricsSyncCreator(){
  const {y, g} = useParams()
  const {data} = useQuery(GET_PROCESSED_LYRICS,{
    variables: {id:g}
  })
  console.log(data)
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  return (
    <Container fluid = {'sm'}>
      <Row className="justify-content-md-center">
        <VideoPlayer playing = {false} url = {`https://www.youtube.com/watch?v=${y}`} setStarted = {setStarted}/>
      </Row>
      <Row className="justify-content-md-center">
        { data
          ? data.processedLyrics.map((word, index) => {
            return (
              <p key = {index} style = {{fontSize: '20px', marginLeft: '10px'}}>{word}</p>
            )
          }) 
          : null 
        }
      </Row>
      
    </Container>
  )
}
