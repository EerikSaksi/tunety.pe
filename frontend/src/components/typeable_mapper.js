import React, {useState, useEffect} from 'react';
import Typeable from './typeable'
import './vertical_alignments.css'
import useTypeables from './hooks/use_typeables';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const VALID_URL_QUERY = gql`
  {
    validUrl @client
  }
`;

function TypeableMapper(){
  const { data: { validUrl } } = useQuery(VALID_URL_QUERY);
  console.log(validUrl);
  const [typeables, gotWrong] = useTypeables();
  const [message, setMessage] = useState("Please enter a YouTube url");
  useEffect(() => {
    if (validUrl != ''){
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
