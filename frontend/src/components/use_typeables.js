import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks';
import Typeable from './typeable'

const GET_CAPTIONS = gql`
query getcaptions($url: String){
  getCaptions(url: $url){ 
     dur
     text
     sleepTime
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
  });
  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, 1000 * s));
  }
  function mapCaptions(){
    //await sleep(data.getCaptions[0].start);    
    for (var i = 0; i < data.getCaptions.length; i++){
      setNewTypeables(newTypeables.concat(data.getCaptions[i]));
     // await sleep(data.getCaptions[i].sleepTime);
      console.log(newTypeables);
    }
  }
  useEffect(() => {
    fetchCaptions();
  }, [url])
  return [newTypeables, setUrl]; 
}
export default useTypeables;
