import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
const VALID_URL_QUERY = gql`
  query isvalidyoutubeurl($url: String) {
    isValidYoutubeUrl(url: $url) 
  }
`;

const GET_INPUT = gql`
  {
    input @client
  }
`;
function useUrlValidation(){
  const [validUrl, setValidUrl] = useState(undefined);

  //listen to changes in global input for as long as a url has not been supplied
  const { data: inputData, client } = useQuery(GET_INPUT, {
    skip: validUrl,
  });

  const [checkValidYoutubeURL] = useLazyQuery(VALID_URL_QUERY,
    { 
      variables: { url : inputData ? inputData.input : "" },
      onCompleted: async ({isValidYoutubeUrl}) => {
        if (isValidYoutubeUrl){
          setValidUrl(inputData.input)
        }
      }
    }
  );
  useEffect(() => {
    if (inputData){
      const input = inputData.input;
      if(checkValidYoutubeURL()){
        setValidUrl(input);
        client.writeData({data: {input:""}});
      }
    }
  }, [inputData])
  return [validUrl]
}
export default useUrlValidation;
