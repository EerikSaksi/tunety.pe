import React, {useState, useEffect} from 'react';

export default function({text}){
  const [opacity, setOpacity] = useState(0)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    setOpacity(1)
    setDisplayText(text)
  }, [])

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
  return(
    <p style = {{textAlign: 'center', transition: `opacity 0.25s`, opacity: opacity}}>
      {displayText}
    </p>
  )
}
