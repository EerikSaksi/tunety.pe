import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
export default function HomeSearchResult({id, imgUrl, artistName, songName}){
  const history = useHistory();
  return(
    <Row>
      <Button onClick = {() => history.push(`/v/${id}`)}>
        <Col>
          <Image src = {imgUrl} style = {{width: '200px', height: '200px' }}/>
        </Col>
        <Col>
          <p>{artistName} - {songName}</p> 
        </Col>
      </Button>
    </Row>
  )
}
