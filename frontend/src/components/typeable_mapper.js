import React, {useState, useEffect} from 'react';
import Typeable from './typeable'
import './typeable_mapper.css'
import useTypeables from './hooks/use_typeables';
import useUrlListener from './hooks/use_url_listener';
import {useApolloClient} from '@apollo/react-hooks';
function TypeableMapper(){
  const client = useApolloClient();
  const [typeables, setIterateCaptions, gotCorrect, gotWrong] = useTypeables();
  const [validUrl] = useUrlListener();
  const [message, setMessage] = useState("Please enter a YouTube url");
  const countDown = async () => {
    client.writeData({data: {input: ""}});
    const startTime = Date.now();
    var currentTime = Date.now();
    while (currentTime - startTime < 3000){
      setMessage(((3000 - currentTime + startTime) / 1000).toFixed(2));
      await new Promise(resolve => setTimeout(resolve, 10));
      currentTime = Date.now();
    }
    setMessage(null);
    setIterateCaptions(true);
  }
  useEffect(() => {
    if (validUrl) { 
      countDown()
    }
  }, [validUrl]) 

  return(
    <div>
      <div className = 'top_center'>
        {message}
      </div>  
      <div className = 'top_center'>
        {typeables
         ? typeables.map(t => <Typeable key = {t.id} {...t} gotCorrect = {gotCorrect} gotWrong = {gotWrong}/>)
         : null
        }
      </div>  
    </div>
  )
};

export default TypeableMapper;
