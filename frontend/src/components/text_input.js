import React, {useEffect} from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks';
import './vertical_alignments.css'

const MUTATION_QUERY = gql`
  mutation($input: String){
    handleInput(input: $input)
  }
`;
const LOCAL_QUERY = gql`
  {
    accuracy @client
    input @client
  }
`
function TextInput() {
  const { data: { input, accuracy }} = useQuery(LOCAL_QUERY);
  const [handleInput] = useMutation(MUTATION_QUERY);
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
            value = {input} 
            onChange = {((e) => handleInput(e.target.value))}
          />
        </form>
      </div>
    </div>
  );
}
export default TextInput;
