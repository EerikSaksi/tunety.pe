import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import SearchResultText from 'components/navigation/search_result_text';
export default function SearchResult({ forwardingUrl, imgUrl, bottomText, centerText, topText, fadeInMillis, style }) {
  //used for routing the url when this item is clicked
  const history = useHistory();

  const [hovering, setHovering] = useState(false);

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
      xs={12}
      style={{
        transition: 'opacity 0.5s',
        opacity: opacity,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        padding: 0,
        maxHeight: 347.5,
        maxWidth: 347.5,
        minHeight: '100%',
        ...style,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Button
        style={{ width: 'auto', padding: 0, border: 0, maxHeight: 347.5, ...style }}
        onClick={() => history.push(forwardingUrl)}
      >
        <Image
          className={hovering ? 'shadow-lg' : ''}
          style={{ maxHeight: 347.5, width: '100%', height: '100%', transition: 'all 200ms' }}
          rounded
          src={imgUrl}
        />
        <SearchResultText style={{ top: 0 }} text={topText} />
        <SearchResultText
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto' }}
          text={centerText}
        />
        <SearchResultText style={{ bottom: 0 }} text={bottomText} />
      </Button>
    </Col>
  );
}
