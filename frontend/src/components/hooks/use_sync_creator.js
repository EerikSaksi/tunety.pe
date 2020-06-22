import React, { useState } from 'react';
export default function useSyncCreator(){
  //denotes the time that the last word was synced (used to calculate the time between words by taking the difference of the currentTime with this)
  const [startingTime, setStartingTime] = useState(0)

  //saves the current index of the word on which we are
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  //saves the word and the time since the last word was synced {text, sleepAfter}. The initial timeStamp is a null word that simply denotes the length before the first lyric
  const [wordTimestamps, setWordTimestamps] = useState([{text: '', time : 0}])
  //called whenever a word is synced
  const syncWord = (word) => {
    //increment index
    setCurrentWordIndex(currentWordIndex => currentWordIndex + 1)
   
    
    //add the elapsed time and current word to the timestamp words mapping
    setWordTimestamps(wordTimestamps => wordTimestamps.concat(({text: word, time: (Date.now() - startingTime)})))
  }
  return [setStartingTime, currentWordIndex, syncWord]
}
