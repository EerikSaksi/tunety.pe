import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
export default function SearchResult({ forwardingUrl, imgUrl, bottomText, topText, fadeInMillis, customStyle }) {
  //used for routing the url when this item is clicked
  const history = useHistory();

  console.log(topText);

  //used for fading in after fadeInMillis
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    async function sleepBeforeAppear(millis) {
      await new Promise((resolve) => setTimeout(resolve, millis));
      setOpacity(1);
    }
    sleepBeforeAppear(fadeInMillis);
  }, [fadeInMillis]);

  return (
    <Col
      xs={3}
      style={{
        transition: 'opacity 0.5s',
        opacity: opacity,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        paddingLeft: '0px',
        paddingRight: '10px',
        minHeight: '100%',
        ...customStyle,
      }}
    >
      <Button
        style={{ width: 347.5, height: 347.5, padding: 0, border: 0 }}
        onClick={() => history.push(forwardingUrl)}
      >
        <Image style={{ width: 'auto', maxWidth: 347.5, height: '100%', maxHeight: 347.5 }} rounded src={imgUrl} />
        <Card
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 30,
            opacity: 0.8,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              alignSelf: 'center',
              width: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: 'black',
              fontSize: 20,
              margin: 0,
            }}
          >
            {topText}
          </p>
        </Card>
        <Card
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            opacity: 0.8,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              color: 'black',
              margin: 0,
              fontSize: 20,
            }}
          >
            {bottomText}
          </p>
        </Card>
      </Button>
    </Col>
  );
}
