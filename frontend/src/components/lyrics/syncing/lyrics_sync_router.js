import React, { useState, lazy, Suspense } from 'react';
import Loading from 'components/universal/loading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import CustomNavBar from 'components/universal/custom_navbar';
const SearchResultForm = lazy(() =>
  import('components/navigation/search_results_form')
);
const VideoClipper = lazy(() =>
  import('components/video_player/video_clipper')
);
const GENIUS_SONG_DATA = gql`
  query geniussongdata($id: String) {
    geniusSongData(id: $id) {
      id
      text
      imgUrl
    }
  }
`;
const YOUTUBE_SEARCH_RESULTS = gql`
  query youtubesearchresults($query: String) {
    youtubeSearchResults(query: $query) {
      id
      text
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
      setInput(geniusSongData.text);
    },
  });

  //the server does not apply a routing url as it does not know the genius id (as geniusID is needed to create) /sync/:youtubeID/:geniusID, so we postProcess in the onCompleted hook of the youtube search in to this hook
  const [processedYoutubeSearch, setProcessedYoutubeSearch] = useState([]);
  console.log(processedYoutubeSearch)
  const {
    data,
    loading: youtubeSearchLoading,
    error: youtubeSearchError,
  } = useQuery(YOUTUBE_SEARCH_RESULTS, {
    variables: { query: input },
    onCompleted: (data) => {
      setProcessedYoutubeSearch(
        data.youtubeSearch.map((result) => {
          result.forwardingUrl = `/sync/${geniusID}/${result.id}}`;
          return result;
        })
      );
    },
    skip: input === '',
  });

  console.log(data)

  /*

  //not missing genius ID
  if (geniusID !== '0') {
    //missing youtube url, provide youtube search input to find one
    if (youtubeID === '0') {
      if (geniusSongData) {
        const { imgUrl, text } = geniusSongData;
        return (
          <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <CustomNavBar />
            <Row className='justify-content-md-center'>
              <p style={{ fontSize: 30 }}>{text}</p>
            </Row>
            <Row className='justify-content-md-center'>
              <Image style={{ width: '15%', height: '15%' }} src={imgUrl} />
            </Row>
            <Suspense fallback={<Loading />}>
              <SearchResultForm
                results={processedYoutubeSearch}
                input={input}
                setInput={setInput}
                formText={
                  youtubeSearchError
                    ? 'Search for a YouTube video or enter enter a Youtube URL to sync the lyrics to:'
                    : 'Enter a Youtube URL to sync the lyrics to:'
                }
                formFontSize={30}
                loading={youtubeSearchLoading}
                defaultValue={youtubeSearchError ? undefined : text}
              />
            </Suspense>
          </Container>
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
        <Suspense fallback={<Loading centered />}>
          <VideoClipper />
        </Suspense>
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
  */
}
