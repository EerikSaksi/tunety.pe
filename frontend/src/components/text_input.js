import React, {useEffect} from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import './text_input.css'
import useTypeables from './hooks/use_typeables';

const LOCAL_DATA = gql`
  {
    input @client
    accuracy @client
  }
`;

function TextInput() {
  const { data: { input, accuracy }, client} = useQuery(LOCAL_DATA);
  var input_style = {
    'background': `linear-gradient(to right, green ${accuracy}%, red ${accuracy}%)`,
    'fontSize': '50px', 
    'textAlign': 'center',
    'color': 'white'
  }
  return(
    <div>
      <div className = 'bottom_center'>
        <form>
          <input style={input_style} type='text'
            onChange = {e => {client.writeData({data: {input: e.target.value}})}}
            value = {input} 
            onSubmit = {() => {}}
          />
        </form>
      </div>
    </div>
  );
}
export default TextInput;
