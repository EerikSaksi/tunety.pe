import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export default function LyricsTimeLine({duration, syncedLyrics, evenLyricsOnly}) {
  return (
    <Row>
      <Col className='align-self-center' xs={10}>
        {
          syncedLyrics.map((line) => {
            return line.filter((word, index) => {
              const diff = word.time - duration
              const filterByParity = (index) => {
                return evenLyricsOnly ? index % 2 === 0 : index % 2 === 1
              }
              //top lyrics are only even and bottom are odd to prevent clumping
              return -5 < diff && diff < 5 && filterByParity(index)
            })
              .map((word) => {
                const diff = word.time - duration
                return (
                  <p key={word.ordering} style={{fontSize: '20px', marginLeft: `${(diff + 5) * 10}%`}}>{word.text}</p>
                )
              })
          })
        }
      </Col>
    </Row>
  )
}
