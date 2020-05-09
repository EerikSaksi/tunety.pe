import React, {useEffect} from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import './text_input.css'
import useTypeables from './hooks/use_typeables';

const GET_INPUT = gql`
  {
    input @client
  }
`;

function TextInput() {
  const { data, client } = useQuery(GET_INPUT);
  const accuracy = useTypeables()[2];
  var input_style = {
    'background': `linear-gradient(to right, green ${accuracy}%, red ${accuracy}%)`,
    'fontSize': '50px', 
    'textAlign': 'center'
  }
  useEffect(() => {
    console.log(accuracy);
  }, [accuracy])
  return(
    <div>
      <div className = 'bottom_center'>
        <form>
          <input style={input_style} type='text'
            onChange = {e => {client.writeData({data: {input: e.target.value}})}}
            value = {data ? data.input : ""}
            onSubmit = {() => {}}
          />
        </form>
      </div>
    </div>
  );
}
export default TextInput;
