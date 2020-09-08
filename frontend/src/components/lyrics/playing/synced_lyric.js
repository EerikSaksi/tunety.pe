import React from 'react'; 
import Container from 'react-bootstrap/Container'
export default function SyncedLyric({text, time, id, topOffset, commonSuffixLength, horizontalOffsetPercentage}){
  return (
    <Container>
      <div style={{width: 'auto', position: 'absolute', 'transform': `translate(-50%, ${topOffset}px)`, transition: `opacity .1s ease-in-out, top 2s ease-in-out`, left: `${horizontalOffsetPercentage}%`}}>
        <p>
          <span style={{color: 'green', display: 'inline-block'}}>
            {text.substring(0,  commonSuffixLength ? commonSuffixLength : 0)}
          </span>
          <span style={{color: 'black', display: 'inline-block'}}>
            {text.substring(commonSuffixLength ? commonSuffixLength : 0)}
          </span>
        </p>
      </div>
    </Container>
  )
}
