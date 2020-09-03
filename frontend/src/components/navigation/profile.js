import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import CustomNavbar from 'components/universal/custom_navbar';
import Nav from 'react-bootstrap/Nav';
import Loading from 'components/universal/loading';
import { useParams } from 'react-router-dom';
import SearchResultHorizontalView from 'components/navigation/search_result_horizontal_view'
import CustomCard from 'components/universal/custom_card';

const USER_DATA = gql`
  query userdata($userName: String) {
    userData(userName: $userName) {
      userName
      existsInDB
      synchronizations {
        geniusID
        searchResult {
          topText
          centerText
          bottomText
          imgUrl
          forwardingUrl
          createdAt
          dateClassifier{
            dateClassified
          }
        }
      }
      gameStats {
        creatorUserName
        youtubeID
        geniusID
        wordsPerMinute
        accuracy
        createdAt
        searchResult {
          topText
          centerText
          bottomText
          imgUrl
          forwardingUrl
          createdAt
          dateClassifier{
            dateClassified
          }
        }
      }
    }
  }
`;
export default function Profile() {
  const { userName } = useParams();
  const { data: { userData } = {}, loading } = useQuery(USER_DATA, {
    variables: { userName },
  });
  const [selectedTab, setSelectedTab] = useState('/gameStats');

  if (loading) {
    return <Loading centered />;
  }
  if (userData && !userData.existsInDB) {
    return <p>Couldn't find user</p>;
  }

  var cardContent;
  if (loading) {
    cardContent = <Loading centered />;
  } else {
    //select either the synchronizations or the gameStat search result representation
    const searchResults = selectedTab === '/gameStats' 
      ? userData.gameStats.map(gameStat => gameStat.searchResult)
      : userData.synchronizations.map(synchronization => synchronization.searchResult)

    console.log(searchResults)
    //render horizontal views which only map elements that belong in their classified date
    cardContent = 
      < >
        <SearchResultHorizontalView searchResults = {searchResults} dateClassified = {'TODAY'} displayDate = {'Today'}/>
        <SearchResultHorizontalView searchResults = {searchResults} dateClassified = {'YESTERDAY'} displayDate = {'Yesterday'}/>
        <SearchResultHorizontalView searchResults = {searchResults} dateClassified = {'THIS_WEEK'} displayDate = {'This Week'}/>
        <SearchResultHorizontalView searchResults = {searchResults} dateClassified = {'FURTHER_BACK'} displayDate = {'Further Back'}/>
      </>
  }

  return (
    <>
      <CustomNavbar />
      <CustomCard style = {{padding: '1em', height: 'auto', }}>
        <Nav
          style={{ height: '10%', justifyContent: 'center',zIndex: 100 }}
          variant='pills'
          activeKey={selectedTab}
          onSelect={(selectedTab) => setSelectedTab(selectedTab)}
        >
          <Nav.Item >
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
