import React, {useEffect} from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import './text_input.css'

const SET_INPUT = gql`
  {
    input @client
  }
`;
function TextInput() {
  const { data, client } = useQuery(SET_INPUT)
  return(
    <div>
      <div className = 'bottom_center'>
        <form>
          <input style={{fontSize: '50px', textAlign: 'center'}} type='text'
            onChange={e => {client.writeData({data: {input: e.target.value}})}}
            value = {data ? data.input : ""}
          />
        </form>
      </div>
    </div>
  );
}
export default TextInput;
