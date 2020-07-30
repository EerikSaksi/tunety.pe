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
  const videoRef = useRef()
  useEffect(() => {
    console.log(document.activeElement)
  }, [document.activeElement])
  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0, scrollBehaviour: 'smooth'}}>
      <CustomNavBar />
      <CustomCard ref={inViewRef} title={"Search For An Artist/Song/Album"} inView={inView}>
        <Row style = {{justifyContent: 'center', marginBottom: 12}}>
          <Button style={{ zIndex: 1000, }} onClick = {() => videoRef.current.scrollIntoView({behaviour: 'smooth'})}>
            How does this site work?
        </Button>
        </Row>
        <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={"Search For An Artist/Song/Album"} loading={loading} />
      </CustomCard>
      <VideoCard ref={videoRef} />
    </Container >
  )
}

