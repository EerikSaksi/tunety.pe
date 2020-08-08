import React, {useEffect, useState, forwardRef} from 'react';
import Card from 'react-bootstrap/Card'
import useWindowSize from '@rehooks/window-size';
import {useInView} from 'react-hook-inview'
export default function CustomCard ({children, title, imgOverlay, linkText, linkHref, style}) {
  const [opacity, setOpacity] = useState(0)
  const [inViewRef, inView] = useInView({
    threshold: 0.5
  })
  useEffect(() => {
    if (inView) {
      setOpacity(1)
    }
  }, [inView])


  const {innerWidth, innerHeight} = useWindowSize()
  console.log(innerWidth);
  return (
    <Card ref={inViewRef} className="shadow-lg" style={{width: `${0.8 * innerWidth}`, position: 'relative', left: '50%', transform: 'translate(-50%, 0px)', opacity: opacity, transition: 'opacity 500ms', marginBottom: 20, marginTop: 20, height: innerHeight - 100, ...style}} border='primary' >
      < >
        <Card.Title style={{fontSize: 40, textAlign: 'center'}}>
          {title}
        </Card.Title>
        <Card.Link style={{fontSize: 20, textAlign: 'center', zIndex: 1000, }} href={linkHref}>
          {linkText}
        </Card.Link>
        <Card.ImgOverlay>
          {imgOverlay}
        </Card.ImgOverlay>
        {children}
      </>
    </Card>
  )
}
