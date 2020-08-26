import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SyncedLyricMapper from 'components/lyrics/playing/synced_lyric_mapper';
import { useParams } from 'react-router-dom';
import CustomNavBar from 'components/universal/custom_navbar';
import PregamePopover from 'components/lyrics/playing/pregame_popover';
import { useQuery, useMutation, gql } from '@apollo/client';
import Loading from 'components/universal/loading';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

const SYNCED_LYRIC_QUERY = gql`
  query syncedlyrics($youtubeID: String, $geniusID: String) {
    syncedLyrics(youtubeID: $youtubeID, geniusID: $geniusID) {
      text
      time
      id
      horizontalOffsetPercentage
    }
  }
`;
const SYNCHRONIZATION_DATA = gql`
  query synchronizationdata($youtubeID: String, $geniusID: String) {
    synchronizationData(youtubeID: $youtubeID, geniusID: $geniusID) {
      startTime
      endTime
    }
  }
`;

const POST_GAME_STATS = gql`
  mutation postgamestats($gameStats: InputGameStats!) {
    postGameStats(gameStats: $gameStats)
  }
`;

export default function GameEntry() {
  const { userName, youtubeID, geniusID } = useParams();
  const { data: { syncedLyrics } = {}, loading } = useQuery(SYNCED_LYRIC_QUERY, {
    variables: { youtubeID, geniusID },
  });
  const playerRef = useRef();
  const { data: { synchronizationData } = {}, error } = useQuery(SYNCHRONIZATION_DATA, {
    variables: { youtubeID, geniusID },
  });

  //playing is set to true from the pregame popup
  const [playing, setPlaying] = useState(false)

  //tracks the total typed characters which is used to calculate wpm
  const [totalCharacters, setTotalCharacters] = useState(0);

  console.log(totalCharacters)

  //set by the navbar component
  const [tokenId, setTokenId] = useState('');

  const [postGameStats, { data }] = useMutation(POST_GAME_STATS, {
    variables: {
      tokenId,
      gameStats: {
        tokenId,
        creatorUserName: userName,
        youtubeID,
        geniusID,
        totalCharacters,
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setVideoDuration(playerRef.current.getCurrentTime());
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (playing && synchronizationData) {
      playerRef.current.seekTo(synchronizationData[0].startTime);
    }
  }, [synchronizationData, playing]);
  const history = useHistory();

  const [input, setInput] = useState('');

  const [backgroundColor, setBackgroundColor] = useState('white');
  const animateBackgroundColor = async (color) => {
    setBackgroundColor(color);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setBackgroundColor('white');
  };

  const [videoDuration, setVideoDuration] = useState(0);

  const formRef = useRef();

  if (!youtubeID || !geniusID) {
    return 'Invalid URL: Missing either a youtubeID or a geniusID';
  }

  return (
    <>
      <CustomNavBar setParentTokenId={setTokenId} />
      {error ? (
        <Row className='justify-content-md-center'>
          <Button onClick={() => history.push(`/s/${youtubeID}/${geniusID}`)}>
            <p>Create synchronization for this song and video.</p>
          </Button>
        </Row>
      ) : !loading ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: backgroundColor,
            transition: 'background-color 200ms',
          }}
        >
          <PregamePopover playing = {playing} setPlaying = {setPlaying}/>
          <Row>
            <Form
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: 800,
                transform: 'translate(-50%, 0%)',
                fontSize: 100,
              }}
              onChange={(e) => setInput(e.target.value)}
            >
              <Form.Control onChange={(e) => setInput(e.target.value)} value={input} className='shadow-lg' ref={formRef} style={{ fontSize: 40 }} autoFocus />
            </Form>
          </Row>
          <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={playing} onEnded={() => {
            setPlaying(false)
            postGameStats()
          }} style={{ opacity: 0 }} />
        {
          playing
          ?
            <SyncedLyricMapper input={input} setInput={setInput} setTotalCharacters={setTotalCharacters} syncedLyrics={loading ? [] : syncedLyrics} videoDuration={videoDuration} animateBackgroundColor={animateBackgroundColor} />
          : 
            null
        }
        </div>
      ) : (
        <>
          <Row style={{ justifyContent: 'center' }}>
            <p>Loading lyrics</p>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Loading />
          </Row>
        </>
      )}
    </>
  );
}
