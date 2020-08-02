import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import PreviewLyric from 'components/lyrics/preview/preview_lyric'
export default function LyricsTimeLine({videoDuration, syncedLyrics, changeLyricById, aboveProgressBar, playing, setPlaying}) {
  const [mappedLyrics, setMappedLyrics] = useState(Array(3))

  //this code is used to get the width of the container once it has rendered. this is because we need to convert the pixel value after a word has been moved to a ratio. for example, if the lyric was moved to the end of the timeline, the new time is the current videoDuration of the video + 5 as the timeline has a radius of 5 both in the positive and negative time
  //((container width - lyric position) / container position) = ratio 
  // newTime = (ratio - .5) * 10
  const [width, setWidth] = useState(0)
  const containerRef = useRef()
  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  //whenever the videoDuration changes refilter the lyrics 
  useEffect(() => {
    var tempMappedLyrics = Array(3)
    for (var i = 0; i < tempMappedLyrics.length; i++) {
      tempMappedLyrics[i] = []
    }
    syncedLyrics.forEach((line) => {
      line.forEach((syncedLyric) => {
        const diff = syncedLyric.time - videoDuration

        //used to filter the even and odd lyrics (as we only want odd lyrics above and even below to reduce clutter)
        const filterByParity = (id) => {
          if (aboveProgressBar) {
            return 0 <= id % 6 && id % 6 <= 2
          }
          else {
            return 3 <= id % 6 && id % 6 <= 6
          }
        }

        //-5 and 5 range makes sure that we only filter lyrics that are within a 5 second radius of the current time, and lyrics that only belong above or below the progress bar. We also do a non-zero check, as all elements being dragged have time 0 temporarily
        if ((-5 < diff && diff < 5 || !syncedLyric.time) && filterByParity(syncedLyric.id)) {
          //place in the correct row by taking the remainder in order to split them equally

          tempMappedLyrics[syncedLyric.id % 3].push(syncedLyric)
        }
      })
    })
    setMappedLyrics(tempMappedLyrics)
  }, [videoDuration])

  return (
    <Container ref={containerRef} fluid style={{height: '30%', width: '80%'}} >
      < >
        {mappedLyrics.map((row, index) => {
          return (
            <Row key={index} style={{marginTop: '8%'}} >
              {row.map((syncedLyric) => {
                //value between 0 and 1 representing relative position of this element on the timeline. 0 is leftmost, 1 is rightmost, and 0.5 is the middle
                const timelineRatio = (syncedLyric.time - videoDuration + 5) / 10;

                //pixel offset is equal to the length of the timeline multiplied by the ratio
                const timePixelOffset = width * timelineRatio
                return (<PreviewLyric key={syncedLyric.id} text={syncedLyric.text} id={syncedLyric.id} time={syncedLyric.time} changeLyricById={changeLyricById} videoDuration={videoDuration} timePixelOffset={timePixelOffset} width={width} playing = {playing} setPlaying = {setPlaying}/>)
              }
              )}
            </Row>
          )
        })}
      </>
    </Container>
  )
}
