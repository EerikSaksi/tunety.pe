import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
const typeableQuery = gql` 
  {
    getTypeable {
      id
      text
      horizontalPosition
      defaultFallingTime
    }
  }
`

function useTypeables(){
  //store/set typeables to render
  const [ typeables, setTypeables] = useState([])

  //load the data
  const { loading, error, data} = useQuery(typeableQuery,
    {
      pollInterval: 1000000000
    }
  );

  //if a new typeable is available, setNewTypeables to these 
  useEffect(() => {
    if (!loading && !error && data.getTypeable) {
      setTypeables(typeables.concat(data.getTypeable))
    }
  }, [data])
  return [ typeables ]
}
export default useTypeables;
