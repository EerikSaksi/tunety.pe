import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import Loading from 'components/universal/loading'
import SearchResultForm from 'components/navigation/search_results_form'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import CustomNavBar from 'components/universal/custom_navbar'
import CustomCard from 'components/universal/custom_card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import HomeIcon from 'media/home.png'
import useWindowSize from '@rehooks/window-size';
const AstleyCard = lazy(() => import('components/navigation/astley_card'))

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

  const astleyOverlayRef = useRef()


  const {data, loading} = useQuery(QUERY, {
    variables: {query: input},
    skip: input === ''
  });

  const {innerHeight} = useWindowSize()
  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
      <CustomNavBar />
      <div style={{height: innerHeight - 60}}>
        <CustomCard title={"Type your tunes!"} style={{height: '40%', width: '40%'}}>
          <Image src={HomeIcon} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 1373 / 3, height: 382 / 3, zIndex: 1000}}></Image>
          <Button style={{position: 'absolute', left: '50%', top: '15%', transform: 'translate(-50%, 0)'}}
            onClick={() =>  window.scrollTo(0, astleyOverlayRef.current.offsetTop)}>
            How does this site work?
          </Button>
        </CustomCard>
        <CustomCard title={"Search For An Artist/Song/Album"} style={{height: `calc(60% - 60px)`}}>
          <Row style={{justifyContent: 'center', marginBottom: 12}}>
          </Row>
          <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={"Search For An Artist/Song/Album"} loading={loading} />
        </CustomCard>
      </div>
      <div ref={astleyOverlayRef}>
        <Suspense  fallback={<Loading />}>
          <AstleyCard />
        </Suspense>
      </div>
    </Container >
  )
}

