import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
export default function LyricsTimeLine({duration, syncedLyrics, evenLyricsOnly}) {
  return (
    <Container xs = {12} fluid style={{justifyContent: 'center', height: '40%', width: '80%'}} >

      {syncedLyrics.map((line) => {
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
            if (word.ordering === 3) {
              debugger
            }
            return (
              <Row xs = {12}>
              <Col xs={1} style={{position: 'absolute', marginLeft: `${(diff + 5) }%`}}>
                <p key={word.ordering} style={{color: evenLyricsOnly ? 'green' : 'red', fontSize: '20px', }}>{word.text}</p>
              </Col>
              </Row>
            )
          })
      })}
    </Container>
  )
}
