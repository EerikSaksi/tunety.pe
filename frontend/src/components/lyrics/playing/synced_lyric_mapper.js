import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
import CustomNavbar from 'components/universal/custom_navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const fallingTime = 3
export default function SyncedLyricMapper({syncedLyrics, input, clearInput, videoDuration}) {
  const [visibleLyrics, setVisibleLyrics] = useState([])
  const [nextVisibleLyrics, setNextVisibleLyrics] = useState([])

  //used to check the next word as the lyrics are ordered by time by the database (no need to filter all for the next word)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [height, setHeight] = useState(0)
  const containerRef = useRef()
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLyrics(nextVisibleLyrics)
      setNextVisibleLyrics(
        syncedLyrics.filter(syncedLyric => {
          //look for lyrics that will be mapped within the next fall but won't be falling after fallingTime * 2
          return (fallingTime <= syncedLyric.time - videoDuration && syncedLyric.time - videoDuration < fallingTime * 2)
        })
      )
    }, fallingTime)
    return () => clearInterval(interval);
  }, [visibleLyrics, nextVisibleLyrics])


  useEffect(() => {
    //check if the next word should appear yet
    var newVisibleLyrics = visibleLyrics
    if (syncedLyrics && currentIndex < syncedLyrics.length && syncedLyrics[currentIndex].time < videoDuration) {
      //if the next word should appear, then listen to the next lyric, and append the current word to the visible ones
      newVisibleLyrics = newVisibleLyrics.concat(syncedLyrics[currentIndex])
      setCurrentIndex(currentIndex + 1)
    }

    //after 3 secodns
    newVisibleLyrics = newVisibleLyrics.map((syncedLyric) => {
      syncedLyric.topOffset = ((videoDuration - syncedLyric.time) / fallingTime) * height
      return (syncedLyric)
    })
    newVisibleLyrics = newVisibleLyrics.filter((syncedLyric) => {
      console.log(syncedLyric)
      return (videoDuration - syncedLyric.time < fallingTime)
    })
    setVisibleLyrics(newVisibleLyrics)
  }, [videoDuration])

  useEffect(() => {
    setVisibleLyrics(
      visibleLyrics.map(syncedLyric => {
        //matching suffix (0)
        if (syncedLyric.text.indexOf(input) === 0) {
          syncedLyric.commonSuffixLength = input.length
        }
        // indexof is not 0
        else {
          syncedLyric.commonSuffixLength = 0
        }
        return syncedLyric
      })
        //filter correct words and out of date ones
        .filter(syncedLyric => {
          if (syncedLyric.text !== input) {
            return false
          }
          clearInput()
          return true
        })
    )
  }, [input])

  //used by synced lyrics to destroy themselves
  const removeByID = (id) => {
    setVisibleLyrics.filter(syncedLyric => {
      return syncedLyric.id !== id
    })
  }

  return (

    < >
      <CustomNavbar />
      <Row>
        {nextVisibleLyrics.map(syncedLyric => {
          return (
            <Col>
              <p>
                {syncedLyric.text}
              </p>
            </Col>
          )
        })}
      </Row>
      <div ref={containerRef} style={{position: 'absolute', top: 0, bottom: '20%', left: 0, right: 0}}>
        {visibleLyrics === []
          ? null
          : visibleLyrics.map(s => <SyncedLyric key={s.id}  {...s} input={input} removeByID={removeByID} topOffset={s.topOffset} commonSuffixLength={s.commonSuffixLength} />)
        }
      </div>
    </>
  )
};
