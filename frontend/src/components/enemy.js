import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Typeable from './typeable'
import './enemy.css'
const enemyQuery = gql`
  {
    getEnemy {
      name
    }
  }
`
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
function Enemy(){
  const [ doRender, setDoRender ] = useState([])
  const { loading, error, data } = useQuery(enemyQuery);
  const { loading: loadingTypeable, error: errorTypeable, data: dataTypeable } = useQuery(typeableQuery,
    {
      pollInterval: 2000
    }
  );
  useEffect(() => {
    if (!loadingTypeable && !errorTypeable && dataTypeable.getTypeable) {
      setDoRender(doRender.concat(dataTypeable.getTypeable))
    }
  }, [dataTypeable])

  if (loading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>Error...</p>
  }
  const { name } = data.getEnemy;

  const dontRenderID = ((id, client) => {
    setDoRender(doRender.filter(t => t.id != id))
  })
  return(
    <div>
      <div className = 'top_center'>
        {name}
      </div>
      <div>
        { 
          doRender.map(t => {
            <Typeable{...t } dontRenderID = {dontRenderID}/>;
          })
        }
      </div>
    </div>
  )
};
export default Enemy;
