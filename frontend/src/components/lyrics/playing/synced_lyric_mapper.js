import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const fallingTime = 3
export default function SyncedLyricMapper({syncedLyrics, input, setInput, videoDuration}) {

  const [height, setHeight] = useState(0)
  const containerRef = useRef()
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const [bucketIndex, setBucketIndex] = useState(0)
  const [visibleLyrics, setVisibleLyrics] = useState(syncedLyrics[0])

  useEffect(() => {
    //check if the next word should appear yet
    var newVisibleLyrics = visibleLyrics

    newVisibleLyrics = newVisibleLyrics.map((syncedLyric) => {
      syncedLyric.topOffset = ((videoDuration - syncedLyric.time) / fallingTime) * height
      if (syncedLyric.text.indexOf(input) === 0) {
        syncedLyric.commonSuffixLength = input.length
      }
      // indexof is not 0
      else {
        syncedLyric.commonSuffixLength = 0
      }
      return (syncedLyric)
    })
    newVisibleLyrics = newVisibleLyrics.filter((syncedLyric) => {
      return (videoDuration - syncedLyric.time < fallingTime)
    })
    setVisibleLyrics(newVisibleLyrics)
  }, [videoDuration])

  useEffect(() => {
    setVisibleLyrics(
      visibleLyrics.map(syncedLyric => {
        //filter correct words and out of date ones
        .filter(syncedLyric => {
          if (syncedLyric.text + ' ' === input) {
            setInput('')
            return false
          }
          else {
            return true
          }
        })
    )
  }, [videoDuration])

  //used by synced lyrics to destroy themselves
  const removeByID = (id) => {
    setVisibleLyrics.filter(syncedLyric => {
      return syncedLyric.id !== id
    })
  }

  return (
    <div ref={containerRef} style={{position: 'absolute', top: 60, bottom: '20%', left: 0, right: 0}}>
      {visibleLyrics === []
        ? null
        : visibleLyrics.map(s => <SyncedLyric key={s.id}  {...s} input={input} removeByID={removeByID} topOffset={s.topOffset} commonSuffixLength={s.commonSuffixLength} />)
      }
    </div>
  )
};
