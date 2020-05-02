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
  const [ message, setMessage] = useState("Please enter a Youtube URL")
  const { data: inputData, client } = useQuery(GET_INPUT, {
    skip: !doCheckURL,
  });

  //call a url check whenever the input changes until the input is valid, set the url of the useTypeables hook in order to trigger a caption fetch   function sleep(s) {
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [checkValidYoutubeURL] = useLazyQuery(VALID_URL_QUERY,
    { 
      variables: { url : inputData ? inputData.input: ""},
      onCompleted: async ({isValidYoutubeUrl}) => {
        if (doCheckURL && isValidYoutubeUrl){
          client.writeData({data: {input:""}})
          for (var i = 5.00; i > 0; i-=0.01){
            setMessage(i.toFixed(2));
            await sleep(10);
          }
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
            ? <p className='top_center'> {message}</p>
            : newTypeables.map(t => <Typeable {...t} />)
        }
      </div>
    </div>  
  )
};
export default TypeableMapper;
