import {useState, useEffect} from 'react'
export function useDuration() {
  const [videoDuration, setVideoDuration] = useState(0)
  const [displayVideoDuration, setDisplayVideoDuration] = useState('0:00')
  const getIncrementedVideoDuration = (amount) => {
    return (amount + videoDuration)
  }

  useEffect(() => {
    const minutes = Math.floor(videoDuration / 60)
    var seconds = Math.floor(videoDuration % 60)
    //pad the seconds
    seconds = seconds >= 10 ? seconds : '0' + seconds.toString()
    setDisplayVideoDuration(`${minutes}:${seconds}`)
  }, [videoDuration])
  return [videoDuration, setVideoDuration, getIncrementedVideoDuration, displayVideoDuration]
}

