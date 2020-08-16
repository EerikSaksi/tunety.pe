import React, {useState, useEffect} from 'react';
export default function ({text, fadeOut, style}) {
  const [opacity, setOpacity] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    setOpacity(1)
    setDisplayText(text)
  }, [text])


  //whenever the text changes fade in and out
  useEffect(() => {
    const blurInAndOut = async () => {
      setOpacity(0)
      await sleep(250)
      setDisplayText(text)
      setOpacity(1)
    }
    blurInAndOut()
  }, [text])
  return (
    <p style={{textAlign: !fadeOut ? 'center' : 'left'   , transition: `opacity 0.25s`, opacity: opacity, ...style}}>
      {displayText}
    </p>
  )
}
