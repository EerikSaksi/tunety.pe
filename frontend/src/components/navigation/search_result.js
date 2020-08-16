import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {useHistory} from "react-router-dom";
export default function SearchResult({forwardingUrl, imgUrl, text, fadeInMillis, customStyle}) {
  //used for routing the url when this item is clicked
  const history = useHistory();

  //used for fading in after fadeInMillis
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    async function sleepBeforeAppear(millis) {
      await new Promise(resolve => setTimeout(resolve, millis));
      setOpacity(1)
    }
    sleepBeforeAppear(fadeInMillis)
  }, [fadeInMillis])
  return (
    <Col xs={3}  style={{transition: 'opacity 0.5s', opacity: opacity, marginTop: 10, marginRight:5, marginLeft:5, paddingLeft: '0px', paddingRight: '10px', minHeight: '100%', ...customStyle}}>
      <Button style={{minWidth: '100%', minHeight: '100%'}} onClick={() => history.push(forwardingUrl)}>
        <Col>
          <Image src={imgUrl} style={{minWidth: '50%', minHeight: '50%', maxWidth: '50%', maxHeight: '50%'}} />
        </Col>
        <Col>
          <p style={{fontSize: '20px'}}>
            {text}
          </p>
        </Col>
      </Button>
    </Col>
  )
}
