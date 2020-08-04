import '@testing-library/jest-dom'
import {render, waitForElement} from '@testing-library/react'
import VideoPlayer from 'components/video_player/video_player'
import React from 'react'


test('startTime works', async () => {
  var videoDuration = 0
  const setVideoDuration = (val) => {
    videoDuration = val
  }

  var buffering = true
  const setBuffering = (val) => {
    buffering = val
  }
  const playerRef = React.createRef()
  render(<VideoPlayer url={'https://www.youtube.com/watch?v=uuNNSBfO3G8'} setVideoDuration={setVideoDuration} startTime={100} setBuffering = {setBuffering} ref = {playerRef} playing = {true}/>)
  
  //after the video is done buffering, within under a second should be in startTime
  await waitForElement(() => !buffering)
  await waitForElement(() => new Promise(resolve => setTimeout(resolve, 1000)))
  expect(videoDuration).toBeGreaterThanOrEqual(100)
})
