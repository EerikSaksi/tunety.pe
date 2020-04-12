import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks';

const styles = {
  top_center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  bottom_center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: 0
  }
}

const wordQuery = gql`
  {
    randomCatNoise
  }`      
const handleInputQuery = gql`
 query handleInputQuery($input:String){
   isCorrectInput(input:$input)
 }`

function TextInput() {
  const [ formText, setFormText ] = useState("wowa");
  const {loading:wordLoading, error:wordError, data:wordData} = useQuery(wordQuery,
    { pollInterval:5000}
  ); 

  const {loading:handleInputLoading, error:handleInputError, data:handleInputData} = useQuery(handleInputQuery,
    {       
      pollInterval:5000,
      variables : {input:formText}
    }
  )
  return(
    <div>
      <div style = {styles.top_center}>
        <p>
          {!wordLoading && !wordError ? wordData.randomCatNoise : null}
        </p>
        <br/>
        <p>
          {!handleInputLoading && !handleInputError ? handleInputData.isCorrectInput.toString(): null}
        </p>
      </div>
      <div style = {styles.bottom_center}>
        <form>
          <input style = {{fontSize: '4vh'}} type = 'text' value = {formText} onChange={e => setFormText(e.target.value)}/>
        </form>
      </div>
    </div>
  );
}
export default TextInput;
