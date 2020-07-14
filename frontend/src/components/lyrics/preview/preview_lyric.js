import React, {useEffect, useState, useRef} from 'react'
import Draggable from 'react-draggable'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useMarginConversion from 'components/lyrics/preview/use_margin_conversion'

export default function PreviewLyric({ordering, text, diff, time, width, changeLyricByOrdering, duration}) {
  //the overlay display string, formatted whenever time changes
  const [displayTime, setDisplayTime] = useState('')
  useEffect(() => {
    setDisplayTime(`${Math.floor(time / 60)}:${time % 60 > 9 ? Math.floor(time) % 60 : "0" + Math.floor(time) % 60}`)
  }, [time])

  //whether or not we are dragging an element, used to remove margin transitions and to temporarily stop an element from moving around
  const [dragging, setDragging] = useState(false)

  const handleStopDragging = (event) => {
    //we calculate the marginLeft based on the offset from the current duration of the song. therefore we need to convert the new moved location in to a time 
    
    //first check if the value is out of bounds (should not be in the first or last 20%)
    var deltaTime = Math.max(event.clientX, width * 0.2)
    deltaTime = Math.min(event.clientX, width * 0.8)

    //we need to subtract 20% of the width from the location where this lyric was dropped, as the client x event includes the first 20% that we do not want
    deltaTime  = (event.clientX - 0.2 * width) / width

    //now that we have the deltaTime on a range from 0 to 1, we want to normalize the deltaTime to be between -5 and 5 (as the maximum additioinal and reducing time is 5)
    deltaTime = (deltaTime - 0.5) * 10

    changeLyricByOrdering(ordering, deltaTime + duration)
    setDragging(false)
  }
  useEffect(() => {
    if (!ordering){
      console.log(diff)
    }
  }, [duration])

  useEffect(() => {
    if (!ordering){
      console.log('changed')
    }
  }, [diff])

  const {marginLeft} = useMarginConversion(diff, dragging)
  return (
    <Draggable axis="x" onStop = {handleStopDragging}>
      <Col key={ordering} style={{transition: `all ${dragging ? 0 : 500}ms`, position: 'absolute', marginLeft: marginLeft, alignSelf: 'center', }, {transform: dragging ?  {} : 'transform(0px, 0px)'}}>
        <Button onMouseDown={() => setDragging(true)} onDragEnd={() => setDragging(false)}>
          <p style={{fontSize: '30px'}}>{text}</p>
        </Button>
      </Col>
    </Draggable >
  )
}
