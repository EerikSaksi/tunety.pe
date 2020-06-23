import React, {useEffect, useState} from 'react'; import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


export default function ({text, id, horizontalPosition, dur, gotWrong}) {
  const [commonSuffixLength, setCommonSuffixLength] = useState(0);
  useEffect(() => {
    if (data) {
      if (data.input.length < text.length) {
        //if input text, correct string is length of input
        if (text.indexOf(data.input) === 0) {
          setCommonSuffixLength(data.input.length)
        }
        //otherwise whole string is incorrect
        else {
          setCommonSuffixLength(0)
        }
      }
    }
  }, [data])
  async function setSelfWrong() {
    await new Promise(resolve => setTimeout(resolve, 1000 * dur));
    gotWrong(id);
  }
  return (
    <Container>
      {state => (
        <div style={{position: 'absolute', 'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, 0)`, transition: `opacity .1s ease-in-out, top ${dur}s ease-in-out`}}>
          <p>
            <span style={{color: 'green', display: 'inline-block'}}>
              {text.substring(0, commonSuffixLength)}
            </span>
            <span style={{color: 'black', display: 'inline-block'}}>
              {text.substring(commonSuffixLength)}
            </span>
          </p>
        </div>
      )}
    </Container>
  )
}
