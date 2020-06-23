import React, {useState} from 'react'
import VideoPlayer from './video_player'
export default () => {
  const [playing, setPlaying] = useState(false)
  const [startingTime, setStartingTime] = useState(0)
  return (
    <VideoPlayer fadeOut={false} playing={playing} setStartingTime={setStartingTime} url={`https://www.youtube.com/watch?v=kOtgze9J708`} />
  )
}
