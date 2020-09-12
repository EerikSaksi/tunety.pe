import React, { useState, lazy, Suspense } from 'react';
import Loading from 'components/universal/loading';
import { useQuery, gql } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import CustomNavBar from 'components/universal/custom_navbar';
import CustomCard from 'components/universal/custom_card';
import Preview from 'components/lyrics/preview/preview'
import RickSync from 'components/lyrics/syncing/rick_astley'
const SearchResultForm = lazy(() => import('components/navigation/search_results_form'));
const LyricsSyncCreator = lazy(() => import('components/lyrics/syncing/lyrics_sync_creator'));



const GENIUS_SONG_DATA = gql`
  query geniussongdata($id: String) {
    geniusSongData(id: $id) {
      topText
      bottomText
      imgUrl
    }
  }
`;
const YOUTUBE_SEARCH_RESULTS = gql`
  query youtubesearchresults($query: String, $geniusID: String!) {
    youtubeSearchResults(query: $query, geniusID: $geniusID) {
      forwardingUrl
      topText
      bottomText
      imgUrl
    }
  }
`;
export default function LyricsSyncRouter() {
  const history = useHistory();
  //y = youtube id, g = genius id
  let { youtubeID, geniusID } = useParams();
  const [input, setInput] = useState('');

  //fetch song data if the  genius id parameter is defined
  const { data: { geniusSongData } = {} } = useQuery(GENIUS_SONG_DATA, {
    variables: { id: geniusID },
    skip: geniusID && geniusID === '0',
    onCompleted: () => {
      const { topText, bottomText } = geniusSongData;
      setInput(`${topText} - ${bottomText}`);
    },
  });
  const { data: { youtubeSearchResults } = {}, loading: youtubeSearchLoading, error: youtubeSearchError } = useQuery(
    YOUTUBE_SEARCH_RESULTS,
    {
      variables: { geniusID, query: input },
      skip: input === '' && !geniusID,
    }
  );

  //not missing genius ID
  if (geniusID !== '0') {
    //missing youtube url, provide youtube search input to find one
    if (youtubeID === '0') {
      if (geniusSongData) {
        const { imgUrl, text } = geniusSongData;
        return (
          <>
            <CustomNavBar />
            <CustomCard style={{ paddingLeft: '1.5em', paddingRight: '1.5em' }}>
              <Row className='justify-content-md-center'>
                <p style={{ fontSize: 30 }}>{`${geniusSongData.topText} - ${geniusSongData.bottomText}`}</p>
              </Row>
              <Row style={{ height: 'min(100%, 347.5px)', justifyContent: 'center' }}>
                <Image style={{ justifyContent: 'center', height: 'min(100%, 347.5px)' }} src={imgUrl} />
              </Row>
              <Row className='justify-content-center'>
                <a style={{ textAlign: 'center', zIndex: 1000 }} href={`https://www.youtube.com/results?search_query=${`${geniusSongData.topText} - ${geniusSongData.bottomText}`}`} target='_blank'>
                  {youtubeSearchError
                    ? "I've reached my YouTube search quota, so just copy paste a YouTube URL:"
                    : null}
                </a>
              </Row>
              <Suspense fallback={<Loading />}>
                <SearchResultForm
                  results={youtubeSearchResults}
                  input={input}
                  setInput={setInput}
                  formText={
                    youtubeSearchError
                      ? 'Search for a YouTube video or enter enter a Youtube URL to sync the lyrics to:'
                      : 'Enter a Youtube URL to sync the lyrics to:'
                  }
                  formFontSize={30}
                  loading={youtubeSearchLoading}
                  defaultValue={
                    youtubeSearchError ? '' : `${geniusSongData.topText} - ${geniusSongData.bottomText}`
                  }
                  style = {{maxHeight: 360 * 2 / 3, maxWidth: 480 * 2 / 3}}
                />
              </Suspense>
            </CustomCard>
          </>
        );
      } else {
        return (
          <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <CustomNavBar />
            <Row className='justify-content-md-center'>
              <Loading />
            </Row>
          </Container>
        );
      }
    }
    //both found, provide UI for videoclipping
    else {
      return (
        //<Suspense fallback={<Loading centered />}>
        //  <LyricsSyncCreator startTime = {16} endTime = {212}/> 
        //</Suspense>
        <Preview startTime = {10} endTime = {212} syncedLyrics = {RickSync}/> 
      );
    }
  }

  //missing genius ID
  else {
    //also missing YouTube ID, just route the user to the home page because they somehow messed up
    if (youtubeID === '0') {
      history.push('/');
    }
  }
}
