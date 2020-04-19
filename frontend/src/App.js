import React from 'react';
import TextInput from './components/text_input'
import Enemy from './components/enemy'
import './App.css'
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function App() {
  return (
    <div>
      <Enemy/>
      <TextInput/>
    </div>
  )
} 
export default App;
