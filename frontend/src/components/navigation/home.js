import React, {useState, useEffect, useRef} from 'react';
import SearchResultForm from 'components/navigation/search_results_form'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import CustomNavBar from 'components/universal/custom_navbar'
import CustomCard from 'components/universal/custom_card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import VideoCard from 'components/navigation/video_card'
import {useInView} from 'react-hook-inview'
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
  const [inViewRef, inView] = useInView()

  const [overlay, setOverlay] = useState('')

  //used to scroll to the astley video when pressed
  const astleyScrollRef = useRef()

  //updated by the astley video every 10ms. This is used to update to the next word in the overlay
  const [astleyVideoDuration, setAstleyVideoDuration] = useState(0)

  //as the synced lyrics are in order, we keep track of the next index whenever the video duration changes
  const [astleySyncIndex, setAstleySyncIndex] = useState(0)

  //by listening to the video duration with the setAstleyVideoDuration duration we passed, update the overlay whenever the next word should appear
  useEffect(() => {
    if (astleyVideoDuration > RickSync[astleySyncIndex].time) {
      setOverlay(RickSync[astleySyncIndex].text)
      setAstleySyncIndex(astleyVideoSyncIndex => astleyVideoSyncIndex + 1)
    }
  }, [astleyVideoDuration, astleySyncIndex])

  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0, }}>
      <CustomNavBar />
      <CustomCard ref={inViewRef} title={"Search For An Artist/Song/Album"} inView={inView}>
        <Row style={{justifyContent: 'center', marginBottom: 12}}>
          <Button style={{zIndex: 1000, }} onClick={() => astleyScrollRef.current.scrollIntoView({behaviour: 'smooth'})}>
            How does this site work?
        </Button>
        </Row>
        <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={"Search For An Artist/Song/Album"} loading={loading} />
      </CustomCard>
      <VideoCard  youtubeID={'dQw4w9WgXcQ'} setVideoDuration = {setAstleyVideoDuration}>
        <p style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', fontSize: 40, textAlign: 'center', color: 'white', zIndex: 1000, }}>
          First, we take a video with synchronized lyrics
      </p>
        <p style={{fontSize: 120, position: 'absolute', color: 'white', textAlign: 'center', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)'}}>
          {overlay}
        </p>
      </VideoCard>
    </Container >
  )
}
