import React, {useState, useEffect} from 'react';
import SyncedLyric from './synced_lyric'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default function SyncedLyricMapper({captions, startingTime, input}) {
  const [visibleLyrics, setVisibleLyrics] = useState([])
  useEffect(() => {
    const mapCaptions = async () => {
      for (var i = 0; i < captions; i++) {
        //append the caption at this time to the 
        setVisibleLyrics(visibleLyrics => [...visibleLyrics, captions[i]]);
        //not last caption
        if (i < captions.length - 1) {
          const elapsedTime = Date.now() - startingTime
          await new Promise(resolve => setTimeout(captions[i]));
        }
      }
    }
    mapCaptions()
  }, [])

  const wordCorrect = (id) => {

  }
  return (
    <Container>
      <Row>
        {visibleLyrics === []
          ? null
          : visibleLyrics.map(t => <SyncedLyric input={input} key={t.id} {...t} gotWrong={gotWrong} />)
        }
      </Row>
      <Row>
        <VideoPlayer />
      </Row>
    </Container>
  )
};
