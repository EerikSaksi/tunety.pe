import React, {useEffect, useState, forwardRef} from 'react';
import Card from 'react-bootstrap/Card'
const customCard = forwardRef(({children, title, imgOverlay, linkText, linkHref, style, inView}, ref) => {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    if (inView) {
      setOpacity(1)
    }
  }, [inView])

  return (
    <Card ref={ref} className="shadow-lg" style={{width: '80%', position: 'relative', left: '50%', transform: 'translate(-50%, 0px)', opacity: opacity, transition: 'opacity 500ms', marginBottom: 20, marginTop: 20, minHeight: window.innerHeight - 100,  ...style}} border='primary' >
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
