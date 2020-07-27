import React, {useEffect, useLayoutEffect, useState, useRef} from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {DraggableCore} from 'react-draggable'

export default function PreviewLyric({id, text, time, timePixelOffset, changeLyricById, videoDuration, width}) {

  //the overlay display string, formatted whenever time changes
  const [displayTime, setDisplayTime] = useState('')

  const [buttonVariant, setButtonVariant] = useState('primary')
  useEffect(() => {
    setDisplayTime(`${Math.floor(time / 60)}:${time % 60 >= 9 ? Math.floor(time) % 60 : "0" + Math.floor(time) % 60}`)
    //videoDuration is updated every 500 seconds. if the videoDuration would match the time before the next time update, sleep the difference and at the end of it indicate that this is the current time
    if (time - videoDuration <= 0.5 && time - videoDuration  > 0) {
      const sleepAndUpdate = async () => {
        await new Promise(resolve => setTimeout(resolve, (time - videoDuration) * 1000));
        setButtonVariant('warning')
        await new Promise(resolve => setTimeout(resolve, 500));
        setButtonVariant('primary')
      }
      sleepAndUpdate()
    }
  }, [videoDuration])

  //this is the pixel offset that the client sees. This is because sometimes we want to use the offset based on the time of this lyric, and other times the offset of the element being currently dragged
  const [clientPixelOffset, setClientPixelOffset] = useState(timePixelOffset)

  const [buttonDimensions, setButtonDimensions] = useState({})


  //used to get the center position of the button
  const draggableRef = useRef()
  useLayoutEffect(() => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect()
      setButtonDimensions({
        width: rect.width,
        top: rect.top,
        bottom: rect.bottom
      })
    }
  }, [])


  //whether or not we are dragging an element, used to remove margin transitions and to temporarily stop an element from moving around
  const [dragging, setDragging] = useState(false)


  const handleStopDragging = (event) => {
    //we calculate the marginLeft based on the offset from the current videoDuration of the song. therefore we need to convert the new moved location in to a time 

    //subtract the first 10% from the timeline (the width is 80% so 10% each side)
    var deltaTime = (event.clientX - 0.1 * width) * 0.9
    deltaTime /= width
    deltaTime = (deltaTime - 0.5) * 10
    changeLyricById(id, videoDuration + deltaTime)
    setDragging(false)
  }

  //when the video is playing, the time pixel offset changes which messes with the element we are dragging
  useEffect(() => {
    if (!dragging) {
      setClientPixelOffset(timePixelOffset)
    }
  }, [timePixelOffset])

  return (
    <>
      <DraggableCore axis={'x'} onStart={() => setDragging(true)} onStop={handleStopDragging} onDrag={(event) => {setClientPixelOffset(Math.max(0, Math.min(width * 0.9, event.clientX - 0.2 * width)))}}>
        <Button key={id} ref={draggableRef} variant={buttonVariant} style={{maxWidth: buttonDimensions.width ? buttonDimensions.width : 300, transition: `transform ease-in-out ${dragging ? 0 : 30}ms`, position: 'absolute', alignSelf: 'center', transform: `translate(${clientPixelOffset}px, 0px)`, justifyContent: 'start'}}>
          <p style={{fontSize: '30px'}}>{text}</p>
        </Button>
      </DraggableCore>
    </>
  )
}

      //<div style={aboveProgressBar ? {bottom: buttonDimensions.top} : {top: buttonDimensions.bottom}, {transition: `all ease-in-out ${buttonDimensions.width ? 400 : 0}ms`, position: 'absolute', alignSelf: 'center', transform: `translate(${clientPixelOffset + buttonDimensions.width / 2}px, 0px)`, width: 1, backgroundColor: 'black', justifyContent: 'center'}}></div>
