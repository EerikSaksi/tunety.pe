import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'

const fallingTime = 3
export default function SyncedLyricMapper({syncedLyrics, input, setInput, videoDuration, animateBackgroundColor}) {

  const [height, setHeight] = useState(0)
  const containerRef = useRef()
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const [bucketIndex, setBucketIndex] = useState(0)
  const [visibleLyrics, setVisibleLyrics] = useState(syncedLyrics[0])

  //this simply shifts currently visible lyrics downwards and filters lryics that are out of time
  useEffect(() => {
    const newVisibleLyrics = visibleLyrics.map((syncedLyric) => {
      //calculate how far far 
      syncedLyric.topOffset = Math.max(((videoDuration - syncedLyric.time) / fallingTime) * height, 0)

      //matching suffix (0)
      if (syncedLyric.text.indexOf(input) === 0) {
        syncedLyric.commonSuffixLength = input.length
      }
      // indexof is not 0
      else {
        syncedLyric.commonSuffixLength = 0
      }

      return (syncedLyric)
    })
      //filter correct words and out of date ones
      .filter(syncedLyric => {
        if (videoDuration - syncedLyric.time > fallingTime) {
          animateBackgroundColor('red')
          return false
        }
        else if (syncedLyric.text + ' ' === input) {
          console.log('input set to 0');
          setInput('')
          animateBackgroundColor('green')
          return false
        }
        else {
          return true
        }
      })
    setVisibleLyrics(newVisibleLyrics)
  }, [videoDuration])

  useEffect(() => {
    if (!visibleLyrics.length) {
      const nextIndex = bucketIndex + 1
      setBucketIndex(nextIndex)
      setVisibleLyrics(syncedLyrics[nextIndex])
    }
  }, [visibleLyrics, bucketIndex])

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
