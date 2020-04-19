import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import { Transition } from 'react-transition-group'
import './typeable.css'
const SET_INPUT = gql`
  {
    input @client
  }
`;
const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function Typeable({text, id, horizontalPosition, dontRenderID}){
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
          setCommonSuffixLength(0)        
        }
      }
      //if the text matches, then dont render self
      else if (data.input === text){
        dontRenderID(id, client)
        client.writeData({data: {input: ""}})
      }
    }
  })
  const defaultStyle = {
    transition: `opacity 300ms ease-in-out`,
    opacity: 0,
  }
  return(
    <Transition in={true} timeout={300}>
      {state => (
        <div className='random' style={{'left': `${horizontalPosition}%`, 'transform': `translate(-${horizontalPosition}%, 0)`, }}>
          <p>
            <span style = {{...defaultStyle, ...transitionStyles[state]}}>
              {text.substring(0, commonSuffixLength)}
            </span>
            <span  style = {{...defaultStyle, ...transitionStyles[state]}}>
              {text.substring(commonSuffixLength)}
            </span>
          </p>
        </div>
      )}
    </Transition>
  )
}
export default Typeable;
