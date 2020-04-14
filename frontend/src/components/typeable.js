import React from 'react';

function Typeable({text}){
  const randomPercentage = Math.floor(Math.random() * 100).toString()  
  const styles = {
    random: {
      position: 'absolute',
      left:  `${randomPercentage}%`,
      transform: `translate(-${randomPercentage}%, 0)`,
    }
  }
  
  return(
    <p style = {styles.random}> {text}</p>
  )
}
export default Typeable;
