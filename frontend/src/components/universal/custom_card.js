import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
export default function ({children, title, imgOverlay, waitBeforeFadeIn}) {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    const sleepBeforeAppear = async () => {
      await new Promise(resolve => setTimeout(resolve, waitBeforeFadeIn));
      setOpacity(1)
    }
    sleepBeforeAppear()
  }, [])
  return (
    <Card className="shadow" style={{width: '80%', position: 'relative', left: '50%', transform: 'translate(-50%, 0px)', opacity: opacity, transition: 'opacity 500ms', marginBottom: 10}} border='primary' >
      < >
        <Card.Title style = {{fontSize: 40, textAlign: 'center'}}>
          {title}
        </Card.Title>
        <Card.ImgOverlay>
          {imgOverlay}
        </Card.ImgOverlay>
        {children}
      </>
    </Card>
  )
}
