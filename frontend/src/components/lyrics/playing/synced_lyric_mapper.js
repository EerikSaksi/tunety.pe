import React, {useState, useEffect, useRef} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
import useComponentSize from '@rehooks/component-size'

const fallingTime = 3
export default function SyncedLyricMapper({syncedLyrics, input, setInput, videoDuration, animateBackgroundColor}) {

  const containerRef = useRef()
  const {height} = useComponentSize(containerRef)

  const [bucketIndex, setBucketIndex] = useState(0)
  const [visibleLyrics, setVisibleLyrics] = useState(syncedLyrics[0])

  //this simply shifts currently visible lyrics downwards and filters lryics that are out of time
  useEffect(() => {

    //whether or not the top offset of all current lyrics is positive 
    var allDeployed = true
    const newVisibleLyrics = visibleLyrics.map((syncedLyric) => {
      //calculate how far far 
      var topOffset = (videoDuration - syncedLyric.time) / fallingTime * height
      if (topOffset <= 0) {
        topOffset = 0
        allDeployed = false
      }
      syncedLyric.topOffset = topOffset

      //matching suffix (0)
      if (topOffset && syncedLyric.text.indexOf(input) === 0) {
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
        else if (syncedLyric.topOffset && syncedLyric.text + ' ' === input) {
          setInput('')
          animateBackgroundColor('green')
          return false
        }
        else {
          return true
        }
      })
    //if all the current visible lyrics have top offset greater than 0 then add the next index of lyrics in
    if (allDeployed) {
      const newIndex = bucketIndex + 1
      if (newIndex < syncedLyrics.length) {
        setBucketIndex(newIndex)
        newVisibleLyrics.push(...syncedLyrics[newIndex])
      }
    }
    setVisibleLyrics(newVisibleLyrics)
  }, [videoDuration, animateBackgroundColor, bucketIndex, height, input, setInput, syncedLyrics, visibleLyrics])


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
