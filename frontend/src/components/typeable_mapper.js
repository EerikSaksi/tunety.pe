import React, { useEffect, useState } from 'react';
import Typeable from './typeable'
import './use_typeables'
import './typeable_mapper.css'
import useTypeables from './use_typeables';
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

const GET_INPUT = gql`
  {
    input @client
  }
`;

const VALID_URL_QUERY = gql`
  query isvalidyoutubeurl($url: String) {
    isValidYoutubeUrl(url: $url) 
  }
`;

function TypeableMapper(){
  const [newTypeables, setUrl] = useTypeables()
  //subscribe to changes to the input until the user hasn't entered a valid url
  const [ doCheckURL, setDoCheckURL ] = useState(true)
  const { data: inputData } = useQuery(GET_INPUT, {
    skip: !doCheckURL,
  });

  //call a url check whenever the input changes until the input is valid, set the url of the useTypeables hook in order to trigger a caption fetch 
  const [checkValidYoutubeURL] = useLazyQuery(VALID_URL_QUERY,
    { 
      variables: { url : inputData ? inputData.input: ""},
      onCompleted: ({isValidYoutubeUrl}) => {
        if(doCheckURL && isValidYoutubeUrl){
          setUrl(inputData.input);
          setDoCheckURL(false);
        }
      }
    }
  );
  useEffect(() => {
    checkValidYoutubeURL();
  }, [inputData])
  return(
    <div>
      <div>
        { doCheckURL
            ? <p className='top_center'> Please enter a Youtube URL </p>
            : newTypeables.map(t => <Typeable {...t} horizontalPosition = {50}/>)
        }
      </div>
    </div>  )
};
export default TypeableMapper;
