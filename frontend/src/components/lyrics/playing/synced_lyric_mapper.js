import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
import Container from 'react-bootstrap/Container'
export default function SyncedLyricMapper({syncedLyrics, input, clearInput, videoDuration}) {
  const [visibleLyrics, setVisibleLyrics] = useState([])

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
    //check if the next word should appear yet
    var newVisibleLyrics = visibleLyrics
    if (syncedLyrics && currentIndex < syncedLyrics.length && syncedLyrics[currentIndex].time < videoDuration) {
      //if the next word should appear, then listen to the next lyric, and append the current word to the visible ones
      console.log(videoDuration)
      console.log(syncedLyrics[currentIndex].time)
      newVisibleLyrics = newVisibleLyrics.concat(syncedLyrics[currentIndex])
      setCurrentIndex(currentIndex + 1)
    }
    newVisibleLyrics = newVisibleLyrics.map((syncedLyric) => {
      syncedLyric.topOffset = ((videoDuration - syncedLyric.time) / 3) * height
      return(syncedLyric)
    })
    newVisibleLyrics = newVisibleLyrics.filter((syncedLyric) => {
      console.log(syncedLyric)
      return(videoDuration - syncedLyric.time < 3)
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
        if (syncedLyric.text !== input ){
          clearInput()
          return false
        }
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
    <div ref={containerRef} style={{position: 'absolute', top: 0, bottom: '20%', left: 0, right: 0}}>
      {visibleLyrics === []
        ? null
        : visibleLyrics.map(s => <SyncedLyric key={s.id}  {...s} input={input} removeByID={removeByID} topOffset={s.topOffset} commonSuffixLength={s.commonSuffixLength} />)
      }
    </div>
  )
};
