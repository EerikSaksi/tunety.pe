import React, {useEffect} from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const styles = {
  bottom_center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: 0,
  }
}

const SET_INPUT = gql`
  {
    input @client
  }
`;
function TextInput() {
  const { data, client } = useQuery(SET_INPUT)
  return(
    <div>
      <div style = {styles.bottom_center}>
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
