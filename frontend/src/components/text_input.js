import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';

const styles = {
  bottom_center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: 0,
  }
}

const setInputQuery = gql`
  mutation SetInput($input: String){
    setInput(input:$input)
  }`
function TextInput() {
  const [setInput] = useMutation(setInputQuery);
  return(
    <div>
      <div style = {styles.bottom_center}>
        <form>
          <input style = {{fontSize: '50px', textAlign:'center'}} type = 'text' onChange={e => setInput({variables: {input: e.target.value}})}/>
        </form>
      </div>
    </div>
  );
}
export default TextInput;
