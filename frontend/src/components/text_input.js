import React,  { useEffect } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import './text_input.css'

const GET_INPUT = gql`
  {
    input @client
  }
`;

const VALID_URL_QUERY = gql`
  query isvalidyoutubeurl($input: String) {
    isValidYoutubeUrl(input: $input) 
  }
`;

function TextInput() {
  const { data, client } = useQuery(GET_INPUT);
  const { data: urlData } = useQuery(VALID_URL_QUERY,  
    {
      variables: { input: data.input }
    }
  )
  useEffect(() => {
    if (urlData){
      console.log(urlData);
    }
    if (urlData && urlData.isValidYoutubeUrl){
      client.writeData({data: {validUrlSupplied: true}})
    }
  }, [data])
  return(
    <div>
      <div className = 'bottom_center'>
        <form>
          <input style={{fontSize: '50px', textAlign: 'center'}} type='text'
            onChange = {e => {client.writeData({data: {input: e.target.value}})}}
            value = {data ? data.input : ""}
          />
        </form>
      </div>
    </div>
  );
}
export default TextInput;
