import React, {useState} from 'react';
import Loading from './loading'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { useParams, useHistory  } from "react-router-dom";
import SearchResultForm from "./search_results_form"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import LyricsSyncCreator from './lyrics_sync_creator'
const YOUTUBE_SEARCH_RESULTS = gql`
  query youtubesearchresults($query: String){
    youtubeSearchResults(query: $query){
      id
      text
      imgUrl
    }
  }
`
const GENIUS_SEARCH_RESULTS = gql`
  query geniussearchresults($query: String){
    geniusSearchResults(query: $query){
      id
      text
      imgUrl
    }
  }
`
const GENIUS_SONG_DATA = gql`
  query geniussongdata($id: String){
    geniusSongData(id: $id){
      id
      text
      imgUrl
    }
  }
`
const YOUTUBE_VIDEO_DATA = gql`
  query youtubevideodata($id: String){
    youtubeVideoData(id: $id){
      id
      text
      imgUrl
    }
  }
`

export default function LyricsSyncRouter(){
  const history = useHistory()
  //y = youtube id, g = genius id
  let {y, g} = useParams();
  const [input, setInput] = useState('')

  //fetch song data if the g genius id parameter is defined
  const {data: geniusSong} = useQuery(GENIUS_SONG_DATA, {
    variables: { id: g },
    skip: g && g === '0'
  })
  //fetch song data if the g genius id parameter is defined
  const {data: youtubeVideo} = useQuery(YOUTUBE_VIDEO_DATA, {
    variables: { id: y },
    skip: y && y === '0'
  })

  //fetch youtube search results. Used only when we have a genius id but not a youtube one
  const {data: youtubeSearch, loading: youtubeSearchLoading} = useQuery(YOUTUBE_SEARCH_RESULTS, {
    variables: { query: input },
    skip: input === ''
  })

  //fetch genius search results. Used only when we have a youtube id but not a genius one
  const {data: geniusSearch, loading: geniusSearchLoading} = useQuery(GENIUS_SEARCH_RESULTS, {
    variables: { query: input },
    skip: input === ''
  })

  //not missing genius ID
  if (g !== '0') {
    //missing youtube url, provide youtube search input to find one
    if (y === '0'){
      if (geniusSong){
        const {imgUrl, text} = geniusSong.geniusSongData
        return (
          <Container>
            <Row className="justify-content-md-center">
              <p>{text}</p>
            </Row>
            <Row className="justify-content-md-center">
              <Image style = {{width: '20%', height: '20%' }} src = {imgUrl}/>
            </Row>
            <SearchResultForm results = {youtubeSearch ? youtubeSearch.youtubeSearchResults: undefined} input = {input} setInput = {setInput} formText = {"Search for a YouTube video or enter enter a Youtube URL to sync the lyrics to:"} loading = {youtubeSearchLoading}/> 
            <Row>
              <Button onClick = {() => setInput('https://www.youtube.com/watch?v=uuNNSBfO3G8')}>  
              </Button>
              <Button onClick = {() => setInput('https://www.youtube.com/watch?v=5_OKQ7A-5W0&')}>  
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
    //both found, provide UI for synchronization
    else {
      return (
        <LyricsSyncCreator/>
      )
    }
  }

  //missing genius ID
  else {
    //also missing YouTube ID, just route the user to the home page because they somehow messed up
    if (y === '0'){
      history.push('/')
    }

    //missing genius ID, provide searcher for genius ID.
    else {
      if (youtubeVideo){
        const {imgUrl, text} = youtubeVideo.youtubeVideoData
        return (
          <Container>
            <Row className="justify-content-md-center">
              <p>{text}</p>
            </Row>
            <Row className="justify-content-md-center">
              <Image style = {{width: '20%', height: '20%' }} src = {imgUrl}/>
            </Row>
            <SearchResultForm results = {geniusSearch? geniusSearch.geniusSearchResults: undefined} input = {input} setInput = {setInput} formText = {"Search for lyrics to sync the video to "}  loading = {geniusSearchLoading}/> 
          </Container>
        )
      }
    }
  }
}
