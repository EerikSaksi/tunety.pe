import React, { useState, useEffect, useRef, lazy } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
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

const GAME_STATS = gql`
  query gamestats($youtubeID: String, $geniusID: String, $creatorUserName: String) {
    gameStats(youtubeID: $youtubeID, geniusID: $geniusID, creatorUserName: $creatorUserName) {
      userName
      wordsPerMinute
      accuracy
    }
  }
`;
export default function GameEntry() {
  const { userName, youtubeID, geniusID } = useParams();
  const { data: { syncedLyrics } = {}, loading } = useQuery(SYNCED_LYRIC_QUERY, {
    variables: { youtubeID, geniusID },
  });
  const { data: { synchronizationData } = {}, error } = useQuery(SYNCHRONIZATION_DATA, {
    variables: { youtubeID, geniusID },
  });

  //playing is set to true from the pregame popup
  const [playing, setPlaying] = useState(false);

  //cat easter egg also set by the pregame popup
  const [showCat, setShowCat] = useState(false);



  //used to jump to startTime and to listen to the videoDuration
  const playerRef = useRef();
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


  //set tokenID is passed to the navbar component which allows us to fetch more
  const [tokenId, setTokenId] = useState('');

  //tracks the total typed characters which is used to calculate wpm
  const [totalCharacters, setTotalCharacters] = useState(0);

  //fetches game stats
  const { data: { gameStats} = {},  fetchMore} = useQuery(GAME_STATS, {
    variables: { geniusID, youtubeID, creatorUserName: userName },
  });

  const [postGameStats] = useMutation(POST_GAME_STATS, {
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
    //once we have posted the new results fetch the new leaderboards including our new time
    onCompleted: () => fetchMore()
  });

  useEffect(() => {
    if (playing && synchronizationData) {
      //playerRef.current.seekTo(synchronizationData[0].startTime);
      playerRef.current.seekTo(250);
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
          <PregamePopover playing={playing} setPlaying={setPlaying} setShowCat={setShowCat} gameStats = {gameStats}/>
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
              <Form.Control
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className='shadow-lg'
                ref={formRef}
                style={{ fontSize: 40 }}
                autoFocus
              />
            </Form>
          </Row>
          <ReactPlayer
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${youtubeID}`}
            playing={playing}
            onEnded={() => {
              setPlaying(false);
              postGameStats();
            }}
            style={{ opacity: 0 }}
          />
          {playing ? (
            <>
              <SyncedLyricMapper
                input={input}
                setInput={setInput}
                setTotalCharacters={setTotalCharacters}
                syncedLyrics={loading ? [] : syncedLyrics}
                videoDuration={videoDuration}
                animateBackgroundColor={animateBackgroundColor}
              />
              {showCat ? (
                <Image style={{ height: 500, width: 500, position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)', top: '50%', zIndex: 0}} src={require('../../../media/cat_nodding.gif')}></Image>
              ) : null}
            </>
          ) : null}
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
