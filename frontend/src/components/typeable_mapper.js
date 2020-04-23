import React, { useEffect, useState } from 'react';
import Typeable from './typeable'
import './use_typeables'
import './typeable_mapper.css'
import useTypeables from './use_typeables';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const GET_VALID_URL_SUPPLIED = gql`
  {
    validUrlSupplied @client
  }
`;
function TypeableMapper(){
  const [ typeables ] = useTypeables();
  const { data } = useQuery(GET_VALID_URL_SUPPLIED);
  console.log(data)
  return(
    <div>
      <div>
        { data && data.validUrlSupplied
            ? typeables.map(t => <Typeable {...t}/>)
            : <p className='top_center'> Please enter a Youtube URL </p>
        }
      </div>
    </div>  )
};
export default TypeableMapper;
