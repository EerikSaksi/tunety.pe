import React, {useState} from 'react'
import Loading from './loading'
import {useParams} from "react-router-dom";
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
const SYNC_QUERY = gql`
query query($id: String)
{
  syncedLyrics(id: $id){
    text
    dur
    sleepAfter
    horizontalPosition
    ordering
  }
}`

const DISPLAY_QUERY = gql`
  query query($id: String)
  {
    displayLyrics(id: $id)
  }`

export default function SelectedGeniusResult() {
  let {id} = useParams();
  const history = useHistory();
  const {error: syncError} = useQuery(SYNC_QUERY, {
    variables: {id: id}
  });
  const {data: displayData, loading: displayLoading, error: displayError} = useQuery(DISPLAY_QUERY, {
    variables: {id: id}
  });
  var returnSyncStatus = <Loading />

  if (syncError) {
    //lyrics exist, but error fetching sync. Display error and give option to manually sync the lyrics
    if (!displayError) {
      returnSyncStatus =
        <Container>
          <Row className="justify-content-md-center">
            <p>{syncError.graphQLErrors[0].message}</p>
          </Row>
          <Row className="justify-content-md-center">
            <Button onClick={() => history.push(`/s/0/${id}`)}>
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
  var returnLyrics = <Loading />
  if (displayError) {
    returnLyrics = <p>{displayError.graphQLErrors[0].message}</p>
  }
  else if (!displayLoading) {
    returnLyrics = displayData.displayLyrics.map((line, index) => {
      return (
        <Row className="justify-content-md-center" style={{minWidth: '100%'}} key={index}>
          <p style={{marginBottom: 10, fontSize: '20px'}}>{line}</p>
        </Row>
      )
    })
  }
  return (
    <Container fluid>
      <Row style={{marginBottom: '20px'}} className="justify-content-md-center">
        {returnSyncStatus}
      </Row>
      <Row className="justify-content-md-center">
        {returnLyrics}
      </Row>
    </Container>
  )
}
