import React, { useState, useRef, lazy, Suspense, useCallback } from 'react';
import Loading from 'components/universal/loading';
import SearchResultForm from 'components/navigation/search_results_form';
import { useQuery, gql } from '@apollo/client';
import CustomNavBar from 'components/universal/custom_navbar';
import CustomCard from 'components/universal/custom_card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import HomeIcon from 'media/home.png';
//const AstleyCard = lazy(() => import('components/video_cards/astley_card'));
//const VideoCard = lazy(() => import('components/video_cards/video_card'));
import AstleyCard from 'components/video_cards/astley_card';
import VideoCard from 'components/video_cards/video_card';

const QUERY = gql`
  query geniussearchresults($query: String) {
    geniusSearchResults(query: $query) {
      imgUrl
      bottomText
      topText
      forwardingUrl
    }
  }
`;
export default function Home() {
  //input of the form, passed to the form but declared here as required for checking if data needs to be fetched
  const [input, setInput] = useState('');

  const astleyOverlayRef = useRef();

  const [astleyVideoDuration, setAstleyVideoDuration] = useState(16);

  const [videosInView, setVideosInView] = useState({ musicVideo: false, lyricsSyncCreator: false , preview: false});

  const setInViewByKey = useCallback((newVideo, newBool) => {
    var newVideosInView = {...videosInView}
    newVideosInView[newVideo] = newBool
    setVideosInView(newVideosInView)
  }, [videosInView]);

  const { data, loading } = useQuery(QUERY, {
    variables: { query: input },
    skip: input === '',
  });

  return (
    <>
      <CustomNavBar />
      <Container>
        <CustomCard title={'Type your tunes!'} style={{ height: '30%' }}>
          <Image src={HomeIcon} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 1373 / 3, height: 382 / 3, zIndex: 1000 }}></Image>
          <Button style={{ position: 'absolute', left: '50%', bottom: '10%', transform: 'translate(-50%, 0)' }} onClick={() => window.scrollTo(0, astleyOverlayRef.current.offsetTop)}>
            How does this site work?
          </Button>
        </CustomCard>
        <CustomCard title={'Search For An Artist/Song/Album'} style={{ minHeight: `calc(70% - 120px)`, height: 'auto', overflow: 'hidden' }}>
          <Row style={{ justifyContent: 'center', marginBottom: 12 }}></Row>
          <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={'Search For An Artist/Song/Album'} loading={loading} />
        </CustomCard>
        <div ref={astleyOverlayRef}>
          <AstleyCard astleyVideoDuration={astleyVideoDuration} setAstleyVideoDuration={setAstleyVideoDuration} videosInView={videosInView} setInViewByKey={setInViewByKey} />
        </div>
        <VideoCard url={'https://www.youtube.com/watch?v=DL7IHppr2wE'} astleyVideoDuration = {astleyVideoDuration} topText={'You can use my handy synchronization UI'} setInViewByKey={setInViewByKey} videoKey={'lyricsSyncCreator'} syncOffset = {15.6}/>
      </Container>
    </>
  );
}
