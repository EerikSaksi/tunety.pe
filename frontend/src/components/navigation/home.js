import React, {useState, useRef, useEffect} from 'react';
import SearchResultForm from 'components/navigation/search_results_form'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import CustomNavBar from 'components/universal/custom_navbar'
import CustomCard from 'components/universal/custom_card'
import Container from 'react-bootstrap/Container'
import VideoPlayer from 'components/video_player/video_player'
import RickSync from 'components/lyrics/syncing/rick_astley'
const QUERY = gql`
query geniussearchresults($query: String){
  geniusSearchResults(query: $query){
    id 
    imgUrl
    text
    origin
  }
}`
export default function Home() {
  //input of the form, passed to the form but declared here as required for checking if data needs to be fetched
  const [input, setInput] = useState('');

  const {data, loading} = useQuery(QUERY, {
    variables: {query: input},
    skip: input === ''
  });

  const playerRef = useRef()
  const [index, setIndex] = useState(0)
  const [overlay, setOverlay] = useState('')
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        console.log(RickSync[index].time)
        if (playerRef.current.getCurrentTime() > RickSync[index].time) {
          setOverlay(RickSync[index].text)
          setIndex(index => index + 1)
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [index])
  useEffect(() => {
    playerRef.current.seekTo(17)
    setPlaying(true)
  }, [playerRef.current])

  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
      <CustomNavBar />
      <CustomCard title={"Search For An Artist/Song/Album"} waitBeforeFadeIn={0}>
        <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={"Search For An Artist/Song/Album"} loading={loading} />
      </CustomCard>
      <CustomCard title={'First, we take a video with synchronized lyrics'} waitBeforeFadeIn={500}>
        <div style={{position: 'relative', paddingTop: '56.25%'}} >
          <VideoPlayer ref={playerRef} visible={true} playing={playing} url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} customStyle={{position: 'absolute', top: 0, left: 0}} />
        </div>
        <p style={{fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%,50%)'}}>
          {overlay}
        </p>
      </CustomCard>
    </Container >

  )
}
