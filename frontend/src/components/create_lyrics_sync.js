import React, {useState} from 'react';
import Loading from './loading'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import SearchResultForm from "./search_results_form"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
const YOUTUBE_SEARCH_RESULTS = gql`
  query youtubesearchresults($query: String){
    youtubeSearchResults(query: $query){
      id
      text
      imgUrl
    }
  }
`
const GENIUS_SONG_DATA = gql`
  query youtubesearchresults($id: String){
    geniusSongData(id: $id){
      id
      text
      imgUrl
    }
  }
`
export default function CreateLyricsSync(){
  //y = youtube id, g = genius id
  let {y, g} = useParams();
  const [input, setInput] = useState('')
  //fetch song data if the g genius id parameter is defined
  const {data: geniusData} = useQuery(GENIUS_SONG_DATA, {
    variables: { id: g },
    skip: g && g === '0'
  })
  //fetch youtube search results. Used only when we have a genius id but not a youtube one
  const {data: youtubeData} = useQuery(YOUTUBE_SEARCH_RESULTS, {
    variables: { query: input },
    skip: input === ''
  })
  if (g !== '0') {
    if (y == '0'){

      if (geniusData){
        const {imgUrl, text} = geniusData.geniusSongData
        const outerFormat = (g) => {
          return (isYoutube, id) => `/s//${g}`
        }
        return (
          <Container>
            <Row className="justify-content-md-center">
              <p>{text}</p>
            </Row>
            <Row className="justify-content-md-center">
              <Image style = {{width: '20%', height: '20%' }} src = {imgUrl}/>
            </Row>
            <SearchResultForm results = {youtubeData ? youtubeData.youtubeSearchResults: undefined} input = {input} setInput = {setInput} formText = {"Search for a YouTube video or enter enter a Youtube URL to sync the lyrics to:"} formatHistory = {outerFormat(g)} test = {`${g}`}/> 
            <Row>
              <Button onClick = {() => setInput('https://www.youtube.com/watch?v=jO_Cp-Qlg5E')}>  
              </Button>
            </Row>
          </Container>
        )
      }
      else {
        return (
          <Container fluid>
            <Row className="justify-content-md-center">
              <Loading/>
            </Row>
          </Container>
        )
      }
    }
  }
}
