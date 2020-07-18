import React, {useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {DraggableCore} from 'react-draggable'

export default function PreviewLyric({id, text, time, timePixelOffset, changeLyricById, videoDuration, width}) {
  //the overlay display string, formatted whenever time changes
  const [displayTime, setDisplayTime] = useState('')

  useEffect(() => {
    setDisplayTime(`${Math.floor(time / 60)}:${time % 60 > 9 ? Math.floor(time) % 60 : "0" + Math.floor(time) % 60}`)
  }, [time])

  //this is the pixel offset that the client sees. This is because sometimes we want to use the offset based on the time of this lyric, and other times the offset of the element being currently dragged
  const [clientPixelOffset, setClientPixelOffset] = useState(timePixelOffset)

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
    console.log(event.clientX)
    pixelsToTimeSet(event.clientX - 0.35 * event.clientX)
    setDragging(false)
  }

  //when the video is playing, the time pixel offset changes which messes with the element we are dragging
  useEffect(() => {
    if (!dragging) {
      setClientPixelOffset(timePixelOffset)
    }
  }, [timePixelOffset])



  return (
    <DraggableCore axis={'x'} onStart={() => setDragging(true)} onStop={handleStopDragging} onDrag={(event) => {setClientPixelOffset(Math.max(event.clientX - 0.2 * width, 0))}}>
      <Col key={id} style={{transition: `all ease-in-out ${dragging ? 0 : 400}ms`, position: 'absolute', alignSelf: 'center', transform: `translate(${clientPixelOffset}px, 0px)`}}>
        <Button>
          <p style={{fontSize: '30px'}}>{text}</p>
        </Button>
      </Col>
    </DraggableCore>
  )
}
//
