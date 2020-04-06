import React, {  useState  } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

import TextInput from './components/text_input'
const query = gql`
      {
        hello
      }
    `

function App() {
//  const { loading, error, data } = useQuery(query); 
 // const [ formText, setFormText ] = useState("");
  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error...</p>;
  return (
    <TextInput/>
  )
} 
export default App;
