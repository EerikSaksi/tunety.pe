import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Typeable from './typeable'
const styles = {
  top_center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
  }
}

const enemyQuery = gql`
  {
    getEnemy {
      name
      typeables{
        text
        id
        horizontalPosition
      }
    }
  }
`
const SET_INPUT = gql`
  {
    input @client
  }
`;
function Enemy(){
  const [ dontRender, setDontRender ] = useState([])
  const { loading, error, data } = useQuery(enemyQuery);
  if (loading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>Error...</p>
  }
  const { name, typeables } = data.getEnemy;

  const dontRenderID = ((id, client) => {
    setDontRender(dontRender.concat(id))
  })
  return(
    <div>
      <div style = {styles.top_center}>
        {name}
      </div>
      <div>
        { typeables.map(t => dontRender.includes(t.id) ? null : <Typeable {...t} dontRenderID = {dontRenderID} />) }
      </div>
    </div>
  )
};
export default Enemy;
