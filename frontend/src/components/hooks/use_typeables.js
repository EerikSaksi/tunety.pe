import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';
import useUrlListener from './use_url_listener';
const GET_CAPTIONS = gql`
query getcaptions($url: String){
  getCaptions(url: $url){
    dur
    text
    sleepAfter
    horizontalPosition
    id
  }
} 
`
function useTypeables(){
  //once fetched save typeables to this
  const [typeables, setTypeables] = useState([]);

  //indicates whether the captions have been fetched
  const [captionsFetched, setCaptionsFetched] = useState(false);

  //listen to a valid url being set. If this is the case, then fetch the captions
  const [validUrl] = useUrlListener()

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  //function to fetch captions
  const [ fetchCaptions, {data}] = useLazyQuery(GET_CAPTIONS, {
    variables : {url: validUrl},
    onCompleted: (() => {
      setCaptionsFetched(true);
    })
  })
  useEffect(() => {
    fetchCaptions();
  }, [validUrl])

  //whether the captions should start mapping
  const [iterateCaptions, setIterateCaptions] = useState(false);

  //listen to changes in being signaled to start mapping captions, and captions being fetched. If both conditions are true, start mapping.
  useEffect(() => {
    if (iterateCaptions && captionsFetched){
      mapCaptions();
    }
  }, [iterateCaptions, captionsFetched])

  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, 1000 * s));
  }

  //maps typeable data, and sleeps the interval between each word
  async function mapCaptions(){
    //the first caption only tells us how long to sleep before the first real caption
    await sleep(data.getCaptions[0].sleepAfter);    
    var reducedSleep = 0.0;
    for (var i = 1; i < data.getCaptions.length; i++){
      const beforeSleep = Date.now();
      setTypeables(typeables => [...typeables, data.getCaptions[i]]);
      await sleep(data.getCaptions[i].sleepAfter - reducedSleep);
      //next time sleep less based on how much longer the sleep took than it was supposed to
      reducedSleep = (Date.now() - beforeSleep) / 1000 - data.getCaptions[i].sleepAfter;
    }
  }

  const client = useApolloClient()
  useEffect(() => {
    const ratio = (wrong + correct) == 0 ? 1 : correct / (wrong + correct);
    client.writeData({data: {accuracy: ratio * 100}});
  }, [correct, wrong])

  //pass these functions to the typeables to allow them to unlist themselves
  function gotCorrect(id){
    setTypeables(typeables => typeables.filter(t => t.id != id));
    setCorrect(correct =>  correct + 1);
  }
  function gotWrong(id){
    setTypeables(typeables => typeables.filter(t => t.id != id));
    setWrong(wrong =>  wrong + 1);
  }
  return [typeables, setIterateCaptions, gotCorrect, gotWrong]; 
}
export default useTypeables;
