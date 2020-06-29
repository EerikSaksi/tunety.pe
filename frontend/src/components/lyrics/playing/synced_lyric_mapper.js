import React, {useState, useEffect} from 'react';
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import SyncedLyric from 'components/lyrics/playing/synced_lyric'
export default function SyncedLyricMapper({captions, startingTime, input}) {
  const [visibleLyrics, setVisibleLyrics] = useState([])
  useEffect(() => {
    const mapCaptions = async () => {
      for (var i = 0; i < captions; i++) {
        //append the caption at this time to the 
        setVisibleLyrics(visibleLyrics => [...visibleLyrics, captions[i]]);
        //not last caption
        if (i < captions.length - 1) {
          //get the time elapsed, and the time when the next word should arrive and sleep until then
          const elapsedTime = Date.now() - startingTime
          await new Promise(resolve => setTimeout(captions[i].time - elapsedTime));
        }
      }
    }
    if (startingTime) {
      mapCaptions()
    }
  }, [startingTime])

  return (
    <Container>
      <Row>
        {visibleLyrics === []
          ? null
          : visibleLyrics.map(t => <SyncedLyric input={input} key={t.id} {...t} />)
        }
      </Row>
    </Container>
  )
};
