import React from 'react'
import Loading from 'components/universal/loading'
import {useParams} from "react-router-dom";
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CustomNavBar from 'components/universal/custom_navbar'
import SearchResult from 'components/navigation/search_result'

const FIND_SYNCHRONIZATION_DATA = gql`
  query findsynchronizationdata($geniusID: String) 
  {
    findSynchronizationData(geniusID: $geniusID) 
  }
`

const DISPLAY_QUERY = gql`
query displaylyrics($id: String){
  displayLyrics(id: $id)
}
`

const YOUTUBE_VIDEO_DATA = gql`
query youtubevideodata($id: String){
  youtubeVideoData(id: $id){
    id
    imgUrl
    text 
    isYoutube
  }
}
`


export default function SelectedGeniusResult() {
  let {geniusID} = useParams();
  const history = useHistory();

  //check if synchronizations for these genius lyrics exist
  const {data: synchronizationData, error: syncError} = useQuery(FIND_SYNCHRONIZATION_DATA, {
    variables: {geniusID: geniusID}
  });

  //fetch the lyrics
  const {data: displayData, loading: displayLoading, error: displayError} = useQuery(DISPLAY_QUERY, {
    variables: {id: geniusID}
  });

  //once the youtube video of this synchronization has loaded, fetch the data to make a nice display
  const {data: youtubeData} = useQuery(YOUTUBE_VIDEO_DATA, {
    variables: {id: synchronizationData ? synchronizationData.findSynchronizationData : 0},
    skip: !synchronizationData
  });

  var returnSyncStatus = <Loading />

  if (syncError) {
    //lyrics exist, but error fetching sync. Display error and give option to manually sync the lyrics
    if (!displayError) {
      returnSyncStatus =
        <Container>
          <Row className="justify-content-md-center">
            <p style={{fontSize: 30}}>{syncError.graphQLErrors[0].message}</p>
          </Row>
          <Row className="justify-content-md-center">
            <Button onClick={() => history.push(`/s/0/${geniusID}`)}>
              <p>Create synchronization for this song.</p>
            </Button>
          </Row>
        </Container>
    }
    //if lyrics don't exist, reduntant to also say sync doesn't exist
    else {
      returnSyncStatus = null
    }
  }
  else if (youtubeData) {
    returnSyncStatus =
      <Container>
        <Row style={{justifyContent: 'center'}}>
          <p style={{textAlign: 'center'}}>
            Synchronizations
          </p>
        </Row>
        <Row style={{justifyContent: 'center'}}>
          <SearchResult {...youtubeData.youtubeVideoData} fadeInMillis={100} customStyle={{paddingRight: 0}} />
        </Row >
      </Container>
  }

  var returnLyrics = <Loading />
  if (!displayLoading) {
    returnLyrics =
      displayData.displayLyrics.map((line, index) => {
        return (
          <Row className="justify-content-md-center" style={{minWidth: '100%'}} key={index}>
            <p style={{marginBottom: 10, fontSize: '20px'}}>{line}</p>
          </Row>
        )
      }
      )
  }
  return (
    <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
      <CustomNavBar />
      <Row style={{marginBottom: '20px'}} className="justify-content-md-center">
        {returnSyncStatus}
      </Row>
      <Row className="justify-content-md-center">
        {returnLyrics}
      </Row>
    </Container>
  )
}
