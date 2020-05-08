import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import useUrlListener from './use_url_listener';
const GET_CAPTIONS = gql`
query getcaptions($url: String){
  getCaptions(url: $url){ 
    text
    id 
    dur
    sleepAfter
    horizontalPosition
    active
  }
}
`
function useTypeables(){
  //once fetched save typeables to this
  const [typeables, setTypeables] = useState(null);

  //whether the captions should start mapping
  const [iterateCaptions, setIterateCaptions] = useState(false);

  //a validUrl that the user has input, used to fetch the correct captions
  const [validUrl] = useUrlListener()

  //fetch once validUrl exists
  const [ fetchCaptions ] = useLazyQuery(GET_CAPTIONS, {
    variables : {url: validUrl},
    onCompleted: (({data}) => {
      setTypeables(data);
    })
  })
  useEffect(() => {
    fetchCaptions();
  }, [validUrl])

  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, 1000 * s));
  }
  async function mapCaptions(){
    await sleep(typeables[0].sleepAfter);    
    var reducedSleep = 0.0;
    for (var i = 1; i < typeables.length; i++){
      const beforeSleep = Date.now();
      console.log("wowa");
      setTypeables(typeables.map((t, index) => {
        if (index === i){
          t.active = true;
        }
        return t;
      }));
      console.log(setTypeables.filter((t) => t.active));
      await sleep(typeables[i].sleepAfter - reducedSleep);
      //next time sleep less based on how much longer the sleep took than it was supposed to
      reducedSleep = (Date.now() - beforeSleep) / 1000 - typeables[i].sleepAfter;
    }
  }

  useEffect(() => {
    if (iterateCaptions && typeables){
      mapCaptions();
    }
  }, [iterateCaptions, typeables])

  return [typeables, setIterateCaptions]; 
}
export default useTypeables;
