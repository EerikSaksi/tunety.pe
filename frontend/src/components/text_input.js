import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks';

const styles = {
  div : {
    backgroundColor: 'blue'
  },
}

const wordQuery = gql`
  {
    randomCatNoise
  }`      
function TextInput() {
  const [ formText, setFormText ] = useState("wowa");
  const {loading:wordLoading, error:wordError, data:wordData} = useQuery(wordQuery,
    { pollInterval:5000 }
  ); 
  if (wordLoading) return <p> Loading... </p>
  if (wordError) return <p>Error...</p> 
  const { randomCatNoise } = wordData
  return(
    <div style={styles.div}>
    </div>
  );
}
export default TextInput;
      
