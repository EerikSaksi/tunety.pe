import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { Transition } from 'react-transition-group'
const SET_INPUT = gql`
  {
    input @client
  }
`;

const transitionStyles = {
  entered:  { opacity: 1, top: window.innerHeight},
  exiting: {opacity: 0, transition:'opacity 1s ease-in-out, top 10000000s ease-in-out'},
  exited: {opacity: 0, transition:'opacity 1s ease-in-out, top 0s ease-in-out'},
} 
function Typeable({text, id, horizontalPosition, defaultFallingTime}){
  const defaultStyle = {
    opacity: 0, 
    top: 0,
    transition: `opacity 1s ease-in-out, top ${defaultFallingTime}s ease-in-out`,
  }
  const { client, data } = useQuery(SET_INPUT)
  const [commonSuffixLength, setCommonSuffixLength] = useState(0)
  const [entered, setEntered] = useState(true)

  //called whenever the input in the textfield changes
  useEffect(() => {
    if (data){
      if (data.input.length < text.length){
        //if input text, correct string is length of input
        if (text.indexOf(data.input) === 0){
          setCommonSuffixLength(data.input.length)
        }
        //otherwise whole string is incorrect
        else {
          setCommonSuffixLength(0)        
        }
      }
      //if the text matches, then dont render self
      else if (data.input === text){
        //dontRenderID(id)
        setEntered(false)
        client.writeData({data: {input: ''}})
      }
    }
  }, [data])

  return (
    <Transition unmountOnExit = {true} appear = {entered} in = {entered} timeout = {{enter: defaultFallingTime, exit: 1000}} classNames='root'>
      {state =>( 
        <div style={{position: 'absolute', 'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, 0)`, ...defaultStyle, ...transitionStyles[state]}}>
          <p>
            <span style = {{color: 'green', display: 'inline-block'}}>
              {text.substring(0, commonSuffixLength)}
            </span>
            <span style = {{color: 'black', display: 'inline-block'}}>
              {text.substring(commonSuffixLength)}
            </span>
          </p>
        </div>
      )}
    </Transition>
  )
}
export default Typeable;
