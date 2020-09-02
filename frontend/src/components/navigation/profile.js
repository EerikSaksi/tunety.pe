import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import CustomNavbar from 'components/universal/custom_navbar';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Loading from 'components/universal/loading';
import { useParams } from 'react-router-dom';
import CustomCard from 'components/universal/custom_card';
import SearchResult from 'components/navigation/search_result';

const SIGNED_IN_USER = gql`
  query userdata($userName: String) {
    userData(userName: $userName) {
      userName
      existsInDB
      synchronizations {
        geniusID
        searchResult {
          topText
          bottomText
          imgUrl
          forwardingUrl
        }
      }
      gameStats {
        creatorUserName
        youtubeID
        geniusID
        wordsPerMinute
        accuracy
        searchResult {
          topText
          centerText
          bottomText
          imgUrl
          forwardingUrl
        }
      }
    }
  }
`;
export default function Profile() {
  const { userName } = useParams();
  const { data: { userData } = {}, loading } = useQuery(SIGNED_IN_USER, {
    variables: { userName },
  });
  const [selectedTab, setSelectedTab] = useState('/gameStats');

  if (loading) {
    return <Loading centered />;
  }
  if (userData && !userData.existsInDB) {
    return <p>Couldn't find user</p>;
  }

  console.log(userData)
  var cardContent;
  if (loading) {
    cardContent = <Loading centered />;
  } else if (selectedTab === '/gameStats') {
    cardContent = userData.gameStats.map((gameStat, index) => <SearchResult id={index} {...gameStat.searchResult} />);
  }

  return (
    <>
      <CustomNavbar />

      <CustomCard>
        <Nav
          style={{ height: '10%', justifyContent: 'center' }}
          variant='pills'
          activeKey={selectedTab}
          onSelect={(selectedTab) => setSelectedTab(selectedTab)}
        >
          <Nav.Item>
            <Nav.Link eventKey='/gameStats'>Game History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='/synchronizations'>Created Synchronizations</Nav.Link>
          </Nav.Item>
        </Nav>
        {cardContent}
      </CustomCard>
    </>
  );
}
