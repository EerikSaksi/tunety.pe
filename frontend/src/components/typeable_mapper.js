import React, {useState, useEffect} from 'react';
import Typeable from './typeable'
import './vertical_alignments.css'
import useTypeables from './hooks/use_typeables';
import useUrlListener from './hooks/use_url_validation';
import {useApolloClient} from '@apollo/react-hooks';
function TypeableMapper(){
  const client = useApolloClient();
  const [typeables, gotWrong] = useTypeables();
  const [validUrl] = useUrlListener();
  const [message, setMessage] = useState("Please enter a YouTube url");
  useEffect(() => {
    if (validUrl){
      setMessage('');
    }
  }, [validUrl]) 

  return(
    <div>
      <div className = 'top_center'>
        {message}
      </div>  
      <div className = 'top_center'>
        {typeables
         ? typeables.map(t => <Typeable key = {t.id} {...t} gotWrong = {gotWrong}/>)
         : null
        }
      </div>  
    </div>
  )
};

export default TypeableMapper;
