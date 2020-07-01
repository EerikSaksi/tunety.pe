import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
export default function LyricsTimeLine({duration, syncedLyrics, evenLyricsOnly}) {
  return (
    syncedLyrics.map((line) => {
      return line.filter((word, index) => {
        const diff = word.time - duration
        const filterByParity = (index) => {
          return evenLyricsOnly ? index % 2 === 0 : index % 2 === 1
        }
        //top lyrics are only even and bottom are odd to prevent clumping, and the filterByParity and the -5 and 5 range is to denote that we want lyrics that are 5 seconds to the left and 5 lyrics to the right
        return -5 < diff && diff < 5 && filterByParity(index)
      })
        .map((word) => {
          const diff = word.time - duration
          //if (word.ordering === 3){
          //  debugger
          //}
          return (
            <Col key={word.ordering}>
              <p style={{color: evenLyricsOnly ? 'green' : 'red', fontSize: '20px', marginLeft: `${(diff + 5) * 10}%`}}>{word.text}</p>
            </Col>
          )
        })
    })

  )
}
