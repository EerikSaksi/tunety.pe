import React, {useEffect, useState} from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const SET_INPUT = gql`
  {
    input @client
  }
`;
function Typeable({text, id, horizontalPosition, dontRenderID}){
  const { data, client } = useQuery(SET_INPUT)
  const [commonSuffixLength, setCommonSuffixLength] = useState(0)

  const styles = {
    random: {
      position: 'absolute',
      left:  `${horizontalPosition}%`,
      transform: `translate(-${horizontalPosition}%, 0)`,
    }
  }
  useEffect(() => {
    if (data){
      if (data.input.length < text.length){
        //if have matching suffix, input is correctString, and rest is incorrect
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
        client.writeData({data: {input: ""}})
      }
    }
  })
  return(
    <div style = {styles.random}> 
      <p>
        <span style={{color: 'green', display: 'inline-block'}}>
          {text.substring(0, commonSuffixLength)}
        </span>
        <span style={{color: 'black', display: 'inline-block'}}>
          {text.substring(commonSuffixLength)}
        </span>
      </p>
    </div>
  )
}
export default Typeable;
