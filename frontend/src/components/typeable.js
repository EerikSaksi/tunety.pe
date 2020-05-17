import React, {useEffect, useState} from 'react';import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import {Transition} from 'react-transition-group'
const GET_INPUT = gql`
  {
    input @client
  }
`;

const transitionStyles = {
  entered: { opacity : 1, top: window.innerHeight},
}

function Typeable({text, id, horizontalPosition, dur, gotWrong}) {
  const defaultStyle = {
    opacity: 1,
    top: 0,
    transition: `opacity .1s ease-in-out, top ${dur}s ease-in-out`,
  }
  const {client, data} = useQuery(GET_INPUT);
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
  async function setSelfWrong(){
    await new Promise(resolve => setTimeout(resolve, 1000 * dur));
    gotWrong(id);
  }
  useEffect(() => {
    setSelfWrong();
  }, [])
  return (
    <Transition appear = {true} in = {true} classNames='root'> 
      {state => (
        <div style={{position: 'absolute', 'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, 0)`, ...defaultStyle, ...transitionStyles[state]}}>
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
    </Transition>
  )
}
export default Typeable;
