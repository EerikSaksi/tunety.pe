import React from 'react'
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
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

export default function SelectedGeniusResult(){
  let { id } = useParams();
  const history = useHistory();
  const {data: syncData, loading: syncLoading, error: syncError} = useQuery(SYNC_QUERY, {
    variables: {id: id}
  });
  const {data: displayData, loading: displayLoading,  error: displayError} = useQuery(DISPLAY_QUERY, {
    variables: {id: id}
  });

  var returnSyncStatus = <p>Checking lyric synchronization status...</p> 
  if (syncError){
    //lyrics exist, but error fetching sync. Display error and give option to manually sync the lyrics
    if (!displayError){
      returnSyncStatus =
        <Container>
          <p>{syncError.graphQLErrors[0].message}</p>
            <Row>
            </Row>
            <Row >
              <Button onClick = {() => history.push(`/r/${id}`)}>
                <p>Create synchronization for this song.</p>
              </Button>
            </Row>
        </Container>
    }
    //if lyrics don't exist, reduntant to also say sync don't exist
    else {
      returnSyncStatus = null
    }
  }
  var returnLyrics = <p>Loading lyrics...</p> 
  if (displayError){
    returnLyrics = <p>{displayError.graphQLErrors[0].message}</p>
  }
  else if (displayData && displayData.displayLyrics) {
    returnLyrics = displayData.displayLyrics.map((line, index) => {
      return(
        <Row>
          <p style = {{fontSize: '20px'}}>{line}</p>
        </Row>
      )
    })   
  }
  console.log(displayData)
  return (
    <Container fluid>
      {returnSyncStatus}
      {returnLyrics}
    </Container>
  )
}
