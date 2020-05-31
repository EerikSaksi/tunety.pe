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
  return (
    <Container fluid>
      {
        syncLoading ? <p>Checking lyric synchronization...</p> : 
          syncError ? (displayError ? null : 
            <Container >
              <Row>
                <p>{syncError.graphQLErrors[0].message}</p>
              </Row>
              <Row >
                <Button onClick = {() => history.push(`/r/${id}`)}>
                  <p>Create synchronization for this song.</p>
                </Button>
              </Row>
            </Container>) : 
            <p>{syncData.syncLyrics}</p>

      }
      {
        displayLoading ? 
            <Row>
              <Image src = {'https://i.imgur.com/j6bKSMV.gif'} />
            </Row>:
            displayError
              ? <p>{}</p>
              : <p>{displayData.displayLyrics}</p>
      }
    </Container>
  )
}
