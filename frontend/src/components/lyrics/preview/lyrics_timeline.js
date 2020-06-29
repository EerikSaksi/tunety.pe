import React from 'react'
import Row from 'react-bootstrap/Row'
export default function LyricsTimeLine({duration, syncedLyrics, evenLyricsOnly}) {
  return (
    <Row xs={10} className="justify-content-md-center">
      {
        syncedLyrics.map((line) => {
          return line.filter((word, index) => {
            const diff = word.time - duration
            const filterByParity =  (index) => {
              return evenLyricsOnly ? index % 2 === 0 : index % 2 === 1
            }
            return 0 < diff && diff < 10 && index % 2 && filterByParity(index)
          })
            .map((word) => {
              const diff = word.time - duration
              return (
                <p key={word.ordering} style={{position: 'absolute', fontSize: '20px', marginLeft: `${diff * 10}%`}}>{word.text}</p>
              )
            })
        })
      }
    </Row>
  )
}
