import React, {useState, useEffect} from 'react'
import Loading from 'components/universal/loading'
import Button from 'react-bootstrap/Button'
export function usePlaybackStatus(started, playing, setPlaying) {
  const [playbackStatus, setPlaybackStatus] = useState('▌▌')
  useEffect(() => {
    //told the video to play
    if (playing) {
      //and the video is playing
      if (started) {
        setPlaybackStatus(<Button block style = {{height: '40px', textAlign: 'center', fontSize: 10}} onClick = {() => setPlaying(!playing)}>▌▌</Button>)
      }
      //waiting for video to start
      else {
        setPlaybackStatus(<Loading style = {{alignSelf: 'center', maxWidth: '100%', maxHeight: '100%', marginBottom: 10}}/>)
      }
    }
    //haven't told the video to play
    else {
      setPlaybackStatus(<Button block style = {{height: '40px',textAlign: 'center', fontSize:15}} onClick = {() => setPlaying(!playing)}>►</Button>)
    }
  }, [started, playing])
  return [playbackStatus]
}
