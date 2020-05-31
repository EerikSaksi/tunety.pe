import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import './vertical_alignments.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
const query = gql`
  {
    validUrl @client
  }
`;

export default function VideoPlayer(){
  const [opacity, setOpacity] = useState(1);
  const [playing, setPlaying] = useState(false);
  const {data: {validUrl}, client} = useQuery(query);
  return(
    <ReactPlayer
      style={{opacity: opacity}}
      className='top_center'
      onReady={() => setPlaying(true)}
      playing={playing}
      url={validUrl}
      onStart={() => {
        setOpacity(0);
        client.writeData({data: {gameStarted: true, input: ""}});
      }} 
    />
  )
}
