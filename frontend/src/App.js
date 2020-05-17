import React from 'react';
import TextInput from './components/text_input'
import TypeableMapper from './components/typeable_mapper'
import VideoPlayer from  './components/video_player'
import './App.css'

function App() {
  return (
    <div>
      <TextInput/>
      <TypeableMapper/>
      <VideoPlayer/>
    </div>
  )
} 
export default App;
