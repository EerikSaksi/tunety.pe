import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks';
import Typeable from './typeable'

const GET_CAPTIONS = gql`
query getcaptions($url: String){
  getCaptions(url: $url){ 
    text
    dur
    sleepAfter
    horizontalPosition
  }
}
`
function useTypeables(){
  const [newTypeables, setNewTypeables] = useState([]);
  const [url, setUrl] = useState("")
  const [ fetchCaptions, {data}] = useLazyQuery(GET_CAPTIONS, {
    variables : {url: url},
    onCompleted: () => {
      mapCaptions();
    }
  })
  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, 1000 * s));
  }
  async function mapCaptions(){
    console.log(data.getCaptions);
    await sleep(data.getCaptions[0].start);    
    for (var i = 0; i < data.getCaptions.length; i++){
      setNewTypeables(newTypeables => [...newTypeables, data.getCaptions[i]]);
      await sleep(data.getCaptions[i].sleepAfter);
    }
  }
  useEffect(() => {
    fetchCaptions();
  }, [url])
  return [newTypeables, setUrl]; 
}
export default useTypeables;
