import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import PreviewLyric from 'components/lyrics/preview/preview_lyric'
export default function LyricsTimeLine({duration, syncedLyrics, changeLyricByOrdering, aboveProgressBar}) {
  const [mappedLyrics, setMappedLyrics] = useState(Array(3))

  //this code is used to get the width of the container once it has rendered. this is because we need to convert the pixel value after a word has been moved to a ratio. for example, if the lyric was moved to the end of the timeline, the new time is the current duration of the video + 5 as the timeline has a radius of 5 both in the positive and negative time
  //((container width - lyric position) / container position) = ratio 
  // newTime = (ratio - .5) * 10
  const [width, setWidth] = useState(0)
  const containerRef = useRef()
  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  //whenever the duration changes refilter the lyrics 
  useEffect(() => {
    var tempMappedLyrics = Array(3)
    for (var i = 0; i < tempMappedLyrics.length; i++) {
      tempMappedLyrics[i] = []
    }
    syncedLyrics.forEach((line) => {
      line.forEach((syncedLyric) => {
        const diff = syncedLyric.time - duration

        //used to filter the even and odd lyrics (as we only want odd lyrics above and even below to reduce clutter)
        const filterByParity = (ordering) => {
          return aboveProgressBar ? ordering % 2 === 0 : ordering % 2 === 1
        }

        //-5 and 5 range makes sure that we only filter lyrics that are within a 5 second radius of the current time, and lyrics that only belong above or below the progress bar
        if (-5 < diff && diff < 5 && filterByParity(syncedLyric.ordering)) {
          //place in the correct row by taking the remainder in order to split them equally
          tempMappedLyrics[Math.floor(syncedLyric.ordering / 2) % 3].push(syncedLyric)
        }
      })
    })
    setMappedLyrics(tempMappedLyrics)
  }, [duration])

  return (
    <Container ref={containerRef} fluid style={{justifyContent: 'center', height: '30%', width: '80%'}} >
      {mappedLyrics.map((row, index) => {
        return (
          <Row key={index} style={{marginTop: '8%'}} >
            {row.map((syncedLyric) => <PreviewLyric key={syncedLyric.ordering} text={syncedLyric.text} ordering={syncedLyric.ordering} diff={syncedLyric.time - duration} time={syncedLyric.time} width = {width} changeLyricByOrdering = {changeLyricByOrdering} duration={duration}/>
            )}
          </Row>
        )
      })}
    </Container>
  )
}
