import React from 'react';
import Loading from 'components/universal/loading';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CustomNavBar from 'components/universal/custom_navbar';
import SearchResult from 'components/navigation/search_result';

const SYNCHRONIZATION_DATA = gql`
  query synchronizationdata($geniusID: String) {
    synchronizationData(geniusID: $geniusID) {
      youtubeID
      searchResult {
        imgUrl
        text
        forwardingUrl
      }
    }
  }
`;

const DISPLAY_QUERY = gql`
  query displaylyrics($id: String) {
    displayLyrics(id: $id){
      lyrics
    }
  }
`;

export default function SelectedGeniusResult() {
  let { geniusID } = useParams();
  const history = useHistory();

  const { data: { synchronizationData } = {}, loading: syncLoading, error: syncError } = useQuery(SYNCHRONIZATION_DATA, {
    variables: { geniusID: geniusID },
  });

  //fetch the lyrics
  const { data: { displayLyrics } = {}, loading: displayLoading, error: displayError } = useQuery(DISPLAY_QUERY, {
    variables: { id: geniusID },
  });

  var returnSyncStatus = <Loading />;

  //lyrics exist, and empty sync set
  if (!displayError && syncError) {
    returnSyncStatus = (
      <Container>
        <Row className='justify-content-md-center'>
          <p style={{ fontSize: 30 }}>No synchronizations exist.</p>
        </Row>
        <Row className='justify-content-md-center'>
          <Button onClick={() => history.push(`/sync/0/${geniusID}`)}>
            <p>Create synchronization for this song.</p>
          </Button>
        </Row>
      </Container>
    );
  } else if (synchronizationData) {
    console.log(synchronizationData)
    returnSyncStatus = (
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          <p style={{ textAlign: 'center' }}>Synchronizations</p>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <SearchResult {...synchronizationData[0].searchResult} fadeInMillis={100} customStyle={{ paddingRight: 0 }} />
        </Row>
      </Container>
    );
  }

  var returnLyrics = <Loading />;
  if (!displayLoading) {
    returnLyrics = displayLyrics.lyrics.map((line, index) => {
      return (
        <Row className='justify-content-md-center' style={{ minWidth: '100%' }} key={index}>
          <p style={{ marginBottom: 10, fontSize: '20px' }}>{line}</p>
        </Row>
      );
    });
  }
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CustomNavBar />
      <Row style={{ marginBottom: '20px' }} className='justify-content-md-center'>
        {returnSyncStatus}
      </Row>
      <Row className='justify-content-md-center'>{returnLyrics}</Row>
    </Container>
  );
}
