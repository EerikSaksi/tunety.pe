import '@testing-library/jest-dom'
import {render, waitFor} from '@testing-library/react'
import VideoPlayer from 'components/video_player/video_player'
import {useState} from 'React'


test('startTime l works', async () => {
  const [videoDuration, setVideoDuration] = useState(0)
  const [buffering, setBuffering] = useState(buffering)
  render(<VideoPlayer url={`https://www.youtube.com/watch?v=${uuNNSBfO3G8}`} setVideoDuration={setVideoDuration} startTime={100} setBuffering = {setBuffering}/>)
  
  //after the video is done buffering, within under a second should be in startTime
  await waitFor(() => !buffering)
  await waitFor(() => new Promise(resolve => setTimeout(resolve, 1000)))
  expect(videoDuration).toBeGreaterThanOrEqual(100)
})
