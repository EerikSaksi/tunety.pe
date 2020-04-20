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
  entering:  { opacity: 0, top: 0 },
  entered:  { opacity: 1, top: window.innerHeight},
};
function Typeable({text, id, horizontalPosition, defaultFallingTime, dontRenderID, alreadyDeployed}){
  const defaultStyle = {
    transition: `opacity 1s ease-in-out, top ${defaultFallingTime}s ease-in-out`,
  }
  const { data, client } = useQuery(SET_INPUT)
  const [commonSuffixLength, setCommonSuffixLength] = useState(0)

  useEffect(() => {
    if (data){
      if (data.input.length < text.length){
        if (text.indexOf(data.input) === 0){
          setCommonSuffixLength(data.input.length)
        }
        else {
          setCommonSuffixLength(0)        
        }
      }
      //if the text matches, then dont render self
      else if (data.input === text){
        dontRenderID(id, client)
        client.writeData({data: {input: ''}})
      }
    }
  })
  return (
    <Transition appear = {alreadyDeployed} in = {alreadyDeployed} timeout={500} classNames='root'>
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
