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
    if (videoDuration - time >= .5){
      console.log(text)
      const sleepAndUpdate = async () => {
        //await new Promise(resolve => setTimeout(resolve, (time - videoDuration) * 100));
        setButtonVariant('warning')
        //await new Promise(resolve => setTimeout(resolve, 100));
        //setButtonVariant('primary')
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

  const pixelsToTimeSet = (pixels) => {
    //we calculate the marginLeft based on the offset from the current videoDuration of the song. therefore we need to convert the new moved location in to a time 

    //convert pixels to ratio on timeline
    var deltaTime = (pixels) / (width * 0.8)

    //now that we have the deltaTime on a range from 0 to 1, we want to normalize the deltaTime to be between -5 and 5 (as the maximum additioinal and reducing time is 5)

    deltaTime = (deltaTime - 0.5) * 10
    changeLyricById(id, videoDuration + deltaTime)
  }

  //whether or not we are dragging an element, used to remove margin transitions and to temporarily stop an element from moving around
  const [dragging, setDragging] = useState(false)


  const handleStopDragging = (event) => {
    pixelsToTimeSet(event.clientX - 0.2 * width)
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
      <DraggableCore axis={'x'} onStart={() => setDragging(true)} onStop={handleStopDragging} onDrag={(event) => {setClientPixelOffset(Math.max(event.clientX - 0.2 * width, 0))}}>
        <Col key={id} style={{maxWidth: buttonDimensions.width ? buttonDimensions.width : 300, transition: `all ease-in-out ${dragging ? 0 : 400}ms`, position: 'absolute', alignSelf: 'center', transform: `translate(${clientPixelOffset}px, 0px)`}}>
          <Button ref={draggableRef} variant = {buttonVariant}>
            <p style={{fontSize: '30px'}}>{text}</p>
          </Button>
        </Col>
      </DraggableCore>
    </>
  )
}

      //<div style={aboveProgressBar ? {bottom: buttonDimensions.top} : {top: buttonDimensions.bottom}, {transition: `all ease-in-out ${buttonDimensions.width ? 400 : 0}ms`, position: 'absolute', alignSelf: 'center', transform: `translate(${clientPixelOffset + buttonDimensions.width / 2}px, 0px)`, width: 1, backgroundColor: 'black', justifyContent: 'center'}}></div>
