import React, {useState, useEffect} from 'react'
export function useDuration() {
  const [duration, setDuration] = useState(0)
  const [displayDuration, setDisplayDuration] = useState('0:00')
  const getIncrementedDuration = (amount) => {
    return (amount + duration)
  }
  useEffect(() => {
    const minutes = Math.floor(duration / 60)
    var seconds = Math.floor(duration % 60)
    //pad the seconds
    seconds = seconds > 9 ? seconds : '0' + seconds.toString()
    setDisplayDuration(`${minutes}:${seconds}`)
  }, [duration])
  return [duration, setDuration, getIncrementedDuration, displayDuration]
}
