import React, {useEffect, useState} from 'react'; 
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


export default ({input, text, fallingDur, time, horizontalPosition, }) => {
  const [commonSuffixLength, setCommonSuffixLength] = useState(0);
  const [currentStyle, setCurrentStyle] = useState('entering')

  const styles = {
    entering: {
      top: 0
    },
    exiting: {
      bottom: 0
    }
  }
  useEffect(() => {
    const eraseSelf = async () => {
      await new Promise(resolve => setTimeout(fallingDur));
    }
    setCurrentStyle('exiting')
    eraseSelf()
  }, [])
  useEffect(() => {
    if (input.length < text.length) {

      //if input text, correct string is length of input
      if (text.indexOf(input) === 0) {
        setCommonSuffixLength(input.length)
      }
      //otherwise whole string is incorrect
      else {
        setCommonSuffixLength(0)
      }
    }
  }, [input])
  return (
    <Container>
      <div style={{position: 'absolute', 'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, 0)`, transition: `opacity .1s ease-in-out, top ${fallingDur}s ease-in-out`, ...styles[currentStyle]}}>
        <p>
          <span style={{color: 'green', display: 'inline-block'}}>
            {text.substring(0, commonSuffixLength)}
          </span>
          <span style={{color: 'black', display: 'inline-block'}}>
            {text.substring(commonSuffixLength)}
          </span>
        </p>
      </div>
    </Container>
  )
}
