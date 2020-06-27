import React,  {useState} from 'react';
export default ({syncedLyrics}) => {
  console.log(syncedLyrics)
  const [playerTime, setPlayerTime] = useState(0)
  return (
    syncedLyrics.map(line => {
      return line.map((word) => {
        return (
          <div>
            <p>{word.text}</p>
            <p>{word.time}</p>
          </div>
        )
      })
    })
  )
}
