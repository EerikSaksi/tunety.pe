import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import useUrlValidation from './hooks/use_url_validation'
import './vertical_alignments.css'
import {useApolloClient} from '@apollo/react-hooks';
export default function VideoPlayer(){
  const [validUrl] = useUrlValidation();
  const [opacity, setOpacity] = useState(1);
  const client = useApolloClient();
  const [playing, setPlaying] = useState(false);
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
