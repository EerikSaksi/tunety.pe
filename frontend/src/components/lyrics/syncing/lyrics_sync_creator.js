import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from 'components/video_player/video_player';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Loading from 'components/universal/loading';
import AnimatedP from 'components/universal/animated_p';
import CustomNavbar from 'components/universal/custom_navbar';
import LyricsSyncPreview from 'components/lyrics/preview/preview';

const PROCESSED_LYRICS = gql`
  query processedlyrics($id: String) {
    processedLyrics(id: $id) {
      id
      text
    }
  }
`;

export default function LyricsSyncCreator({ startTime, endTime }) {
  const { youtubeID, geniusID } = useParams();

  const playerRef = useRef(null);

  //denotes the epoch time when the video started playing. used to calculate the time when a key was pressed.
  const [playing, setPlaying] = useState(false);

  //called by the video player when the video has finished playing. used to conditionally render the preview
  const [ended, setEnded] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  useEffect(() => {
    document.addEventListener('keydown', detectKey, false);
    return () => window.removeEventListener('keydown', () => {
      if (!playing) {
        setPlaying(true);
        if (playerRef.current) {
          playerRef.current.seekTo(startTime);
        }
      }
      //if the video has started and a key was pressed, sync the current word
      else if (!buffering) {
        syncWord();
      }
    });
  }, [buffering, playing, startTime, syncWord]);


  //saves the word and the time since the last word was synced {text, sleepAfter}. The initial timeStamp is a null word that simply denotes the length before the first lyric

  const [syncedLyrics, setSyncedLyrics] = useState({});

  //called whenever a word is synced
  const syncWord = () => {
    //not out of bounds
    if (currentRow < syncedLyrics.length) {
      //add the elapsed time and current word to the timestamp words mapping
      setSyncedLyrics((syncedLyrics) =>
        syncedLyrics.map((row, rowIndex) => {
          return row.map((word, colIndex) => {
            //if the currentWord set the time
            if (rowIndex === currentRow && colIndex === currentCol) {
              word.time = playerRef.current.getCurrentTime();
            }
            return word;
          });
        })
      );
      //on last word of row, go to the start of the next row
      if (syncedLyrics[currentRow].length - 1 === currentCol) {
        setCurrentRow((currentRow) => currentRow + 1);
        setCurrentCol(0);
      }

      //otherwise the next col
      else {
        setCurrentCol((currentCol) => currentCol + 1);
      }
    }
  };

  //create end time listener
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        if (playerRef.current.getCurrentTime() > endTime) {
          setEnded(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playerRef, endTime]);

  //used to tell the user what to do
  const [instructions, setInstructions] = useState('Waiting for lyrics to be processed...');

  //used to tell Video Player to start playing the song
  const [buffering, setBuffering] = useState(true);

  //once the processed lyrics have been loaded, start listening to key presses
  const { data } = useQuery(PROCESSED_LYRICS, {
    variables: { id: geniusID },
    onCompleted: () => {
      ////remove __typename and set the synced lyrics to be the fetched ones
      setSyncedLyrics(
        data.processedLyrics.map((row) => {
          return row.map((word) => {
            delete word.__typename;
            return word;
          });
        })
      );
      setInstructions('Press any key to start the video');
    },
  });


  //when the startingTime has been set to a nonzero value by the video player the video has started playing
  useEffect(() => {
    if (!buffering) {
      setInstructions('Whenever the highlighted word is said, press any key to sync it.');
    }
  }, [buffering])

  return   
    (
    ended 
    ?
    <LyricsSyncPreview syncedLyrics={syncedLyrics} startTime={startTime} endTime={endTime} />
  ) 
    : 
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <CustomNavbar centerContent={<AnimatedP text={instructions} style={{ fontSize: 30, color: 'white', zIndex: 1000, textAlign: 'center' }} />} />
      <Row className='justify-content-md-center'>
        <VideoPlayer visible={true} ref={playerRef} fadeOut={false} playing={playing} url={`https://www.youtube.com/watch?v=${youtubeID}`} setEnded={setEnded} setBuffering={setBuffering} disableControls={true} />
      </Row>
      {data ? (
        data.processedLyrics.slice(currentRow).map((line, rowIndex) => {
          return (
            <Row className='justify-content-md-center' style={{ minWidth: '100%' }} key={rowIndex}>
              {line.map((word, colIndex) => {
                return rowIndex === 0 && currentCol === colIndex ? (
                  <mark
                    key={word.id}
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      marginBottom: 10,
                      fontSize: '40px',
                      marginLeft: '0.5em',
                    }}
                  >
                    {word.text}
                  </mark>
                ) : (
                  <p
                    key={word.id}
                    style={{
                      marginBottom: 10,
                      fontSize: '40px',
                      marginLeft: '0.5em',
                    }}
                  >
                    {word.text}
                  </p>
                );
              })}
            </Row>
          );
        })
      ) : (
        <Loading centered />
      )}
    </Container>
  );
}
