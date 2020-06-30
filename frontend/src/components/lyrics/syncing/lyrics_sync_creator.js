import React, {useState, useEffect, useRef} from 'react';
import VideoPlayer from 'components/video_player/video_player'
import {useParams} from "react-router-dom";
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Loading from 'components/universal/loading'
import Card from 'react-bootstrap/Card'
import AnimatedP from 'components/universal/animated_p'
import sampleSync from 'components/lyrics/syncing/sample_sync'
import LyricsSyncPreview from 'components/lyrics/preview/preview'

const PROCESSED_LYRICS = gql`
query processedlyrics($id: String){
  processedLyrics(id: $id){
    ordering
    text
  }
}`

export default function LyricsSyncCreator() {
  const {y, g} = useParams()

  const playerRef = useRef(null)
  //denotes the epoch time when the video started playing. used to calculate the time when a key was pressed.
  const [started, setStarted] = useState(false)

  //called by the video player when the video has finished playing. used to conditionally render the preview 
  const [ended, setEnded] = useState(true)

  //store the current position in processedLyrics (initially at row 0 so when )
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)

  //saves the word and the time since the last word was synced {text, sleepAfter}. The initial timeStamp is a null word that simply denotes the length before the first lyric
  //const [syncedLyrics, setSyncedLyrics] = useState([{text: '', time: 0}])
  const [syncedLyrics, setSyncedLyrics] = useState(sampleSync)
  //called whenever a word is synced
  const syncWord = () => {
    //not out of bounds
    if (currentRow < syncedLyrics.length) {
      //add the elapsed time and current word to the timestamp words mapping
      setSyncedLyrics(syncedLyrics => syncedLyrics.map((row, rowIndex) => {
        return (
          row.map((word, colIndex) => {
            //if the currentWord set the time 
            if (rowIndex === currentRow && colIndex === currentCol) {
              word.time = playerRef.current.getCurrentTime()
            }
            return word
          })
        )
      }))
      //on last word of row, go to the start of the next row
      if (syncedLyrics[currentRow].length - 1 === currentCol) {
        setCurrentRow(currentRow => currentRow + 1)
        setCurrentCol(0)
      }

      //otherwise the next row
      else {
        setCurrentCol(currentCol => currentCol + 1)
      }

    }
  }
  //used to tell the user what to do
  const [instructions, setInstructions] = useState("Waiting for lyrics to be processed...")
  //used to tell Video Player to start playing the song
  const [playing, setPlaying] = useState(false);

  const [keyPresses, setKeyPresses] = useState(0)
  //once the processed lyrics have been loaded, start listening to key presses
  const {data} = useQuery(PROCESSED_LYRICS, {
    variables: {id: g},
    onCompleted: (() => {
      document.addEventListener("keydown", detectKey, false);
      setInstructions("Press any key to the start the video and synchronization")
      setSyncedLyrics(data.processedLyrics)
      setSyncedLyrics(sampleSync)
    })
  })

  //used to trigger useEffect (boolean hooks always seem to be their initial value inside functions)
  const detectKey = ((event) => {
    if (event.keyCode) {
      setKeyPresses(keyPresses => setKeyPresses(keyPresses + 1))
    }
  })
  useEffect(() => {
    if (keyPresses !== 0) {
      if (!playing) {
        setPlaying(true)
      }
      //if the video has started and a key was pressed, sync the current word
      else if (started) {

        syncWord()
      }
    }
  }, [keyPresses])


  //when the startingTime has been set to a nonzero value by the video player the video has started playing 
  useEffect(() => {
    if (started) {
      setInstructions("Whenever the highlighted word is said, press any key to sync it.")
    }
  }, [started])
  useEffect(() => {
    if (ended) {
      console.log(syncedLyrics)
    }
  }, [ended])
  return (
    ended
      ? <LyricsSyncPreview syncedLyrics={syncedLyrics} />
      : <Container xs={1}>
        <Row className="justify-content-md-center">
          <Card>
            <AnimatedP text={instructions} />
          </Card>
        </Row>
        <Row className="justify-content-md-center">
          <VideoPlayer ref={playerRef} fadeOut={false} playing={playing} setStarted={setStarted} url={`https://www.youtube.com/watch?v=${y}`} setEnded={setEnded} />
        </Row>
        {
          data
            ? data.processedLyrics.slice(currentRow).map((line, rowIndex) => {
              return (
                <Row className="justify-content-md-center" style={{minWidth: '100%'}} key={rowIndex}>
                  {
                    line.map((word, colIndex) => {
                      return (
                        <p key={word.ordering} style={{
                          marginBottom: 10, fontSize: '40px', marginLeft: '0.5em',
                          color: rowIndex === 0 && currentCol === colIndex ? 'green' : 'black'
                        }}>{word.text}</p>
                      )
                    })
                  }
                </Row>
              )
            })
            :
            <Row className="justify-content-md-center">
              <Loading />
            </Row>
        }
      </Container>
  )
}
