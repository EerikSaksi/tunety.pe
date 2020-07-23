import React, {useEffect, useLayoutEffect, useState} from 'react'; 
import Container from 'react-bootstrap/Container'
export default function SyncedLyric({text, time, id, topOffset, commonSuffixLength}){
  const horizontalPosition = '50'
  return (
    <Container>
      <div style={{position: 'absolute', 'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, ${topOffset}px)`, transition: `opacity .1s ease-in-out, top 2s ease-in-out`, }}>
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
