import React, {useEffect, useState, forwardRef} from 'react';
import Card from 'react-bootstrap/Card'
import useWindowSize from '@rehooks/window-size';

const customCard = forwardRef(({children, title, imgOverlay, linkText, linkHref, style, inView, widthCoefficient, heightCoefficient}, ref) => {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    if (inView) {
      setOpacity(1)
    }
  }, [inView])

  const {innerWidth, innerHeight} = useWindowSize()
  return (
    <Card ref={ref} className="shadow-lg" style={{width: `${widthCoefficient ? widthCoefficient * innerWidth : innerWidth * 0.8}`, position: 'relative', left: '50%', transform: 'translate(-50%, 0px)', opacity: opacity, transition: 'opacity 500ms', marginBottom: 20, marginTop: 20, height: `${heightCoefficient ? heightCoefficient * innerHeight : innerHeight - 100}`, ...style}} border='primary' >
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
})
export default customCard
