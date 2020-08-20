import React, { useState, useEffect, useRef} from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SyncedLyricMapper from 'components/lyrics/playing/synced_lyric_mapper';
import { useParams } from 'react-router-dom';
import CustomNavBar from 'components/universal/custom_navbar';
import { useQuery , gql} from '@apollo/client'
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

export default function GameEntry() {
  const { youtubeID, geniusID } = useParams();
  const { data: { syncedLyrics } = {}, loading } = useQuery(SYNCED_LYRIC_QUERY, {
    variables: { youtubeID, geniusID },
  });
  const playerRef = useRef();
  const { data: { synchronizationData } = {}, error } = useQuery(SYNCHRONIZATION_DATA, {
    variables: { youtubeID, geniusID },
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
    if (playerRef.current && synchronizationData){
      playerRef.current.seekTo(synchronizationData[0].startTime)
    }
  }, [synchronizationData, playerRef])
  const history = useHistory();

  const [input, setInput] = useState('');

  const [backgroundColor, setBackgroundColor] = useState('white');
  const animateBackgroundColor = async (color) => {
    setBackgroundColor(color);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setBackgroundColor('white');
  };

  const [ended, setEnded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const formRef = useRef();


  if (!youtubeID || !geniusID) {
    return 'Invalid URL: Missing either a youtubeID or a geniusID';
  }
  if (ended) {
    return <p>wowa</p>;
  }

  return (
    <>
      <CustomNavBar />
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
          <ReactPlayer ref={playerRef}  url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={true}  onEnded = {() => setEnded(true)}   style = {{opacity: 0}} />
          <SyncedLyricMapper input={input} setInput={setInput} syncedLyrics={loading ? [] : syncedLyrics} videoDuration={videoDuration} animateBackgroundColor={animateBackgroundColor} /> 
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
