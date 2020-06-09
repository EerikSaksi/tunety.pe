import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
export default function HomeSearchResult({id, imgUrl, artistName, songName, fadeInMillis}){
  const history = useHistory();
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    async function sleepBeforeAppear(millis){
      await new Promise(resolve => setTimeout(resolve, millis));
      setOpacity(1)
    }
    sleepBeforeAppear(fadeInMillis)
  }, [])
  return(
    <Col xs = {5} style = {{transition: 'opacity 0.5s', opacity:opacity, marginTop: '10px', paddingLeft: '0px', paddingRight: '10px'}}>
      <Button style = {{minWidth:'100%'}} onClick={() => history.push(`/v/${id}`)}>
        <Col>
          <Image src={imgUrl} style={{width: '200px', height: '200px'}} />
        </Col>
        <Col>
          <p style = {{fontSize: '20px'}}>
            {text}
          </p>
        </Col>
      </Button>
    </Col>
  )
}
