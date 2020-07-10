import React, {useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
export default function LyricsTimeLine({duration, syncedLyrics, aboveProgressBar}) {
  const [firstRow, setFirstRow] = useState([])
  const [secondRow, setSecondRow] = useState([])
  const [thirdRow, setThirdRow] = useState([])

  //whenever the duration changes refilter the lyrics 
  useEffect(() => {
    var tempFirstRow = []
    var tempSecondRow = []
    var tempThirdRow = []
    syncedLyrics.forEach((line) => {
      line.forEach(syncedLyric => {
        const diff = syncedLyric.time - duration
        //used to filter the even and odd lyrics (as we only want odd lyrics above and even below to reduce clutter)
        const filterByParity = (ordering) => {
          return aboveProgressBar ? ordering % 2 === 0 : ordering % 2 === 1
        }
        //-5 and 5 range makes sure that we only filter lyrics that are within a 5 second radius of the current time
        const renderedLyric = <Col key={syncedLyric.ordering} style={{position: 'absolute', marginLeft: `${(diff + 5) * 10}%`}}><p  style={{color: aboveProgressBar ? 'green' : 'red', fontSize: '40px', }}>{syncedLyric.text}</p></Col>
        if (-5 < diff && diff < 5 && filterByParity(syncedLyric.ordering)) {
          //determine which row the current word should be placed in
          switch (syncedLyric.ordering % 3) {
            case 0:
              tempFirstRow.push(renderedLyric)
              break
            case 1:
              tempSecondRow.push(renderedLyric)
              break
            case 2:
              tempThirdRow.push(renderedLyric)
              break
          }
        }
      })
    })
    setFirstRow(tempFirstRow)
    setSecondRow(tempSecondRow)
    setThirdRow(tempThirdRow)
  }, [duration])
  console.log(firstRow)

  return (
    <Container fluid style={{justifyContent: 'center', height: '40%', width: '80%'}} >
      <div>  
        {firstRow.map(renderLyric => renderLyric)}
      </div>
      <br/>
      <div>
        {secondRow.map(renderLyric => renderLyric)}
      </div>
      <br/>
      <div>
        {thirdRow.map(renderLyric => renderLyric)}
      </div>
    </Container>
  )
}
