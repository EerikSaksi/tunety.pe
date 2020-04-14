import React  from 'react';
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
      }
    }
  }
`
function Enemy(){
  const {loading, error, data} = useQuery(enemyQuery)

  if (loading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>Error...</p>
  }
  const { name, typeables } = data.getEnemy
  return(
    <div>
      <div style = {styles.top_center}>
        {name}
        <br/>
      </div>
      <div>
        {typeables.map(Typeable)}
      </div>
    </div>
  )
};
export default Enemy;
