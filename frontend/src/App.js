import React, {  useState  } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import TextInput from './components/text_input'
import Enemy from './components/enemy'
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
    <div style = {{fontSize:'50px'}}>
      <TextInput/>
      <Enemy/>
    </div>
  )
} 
export default App;
