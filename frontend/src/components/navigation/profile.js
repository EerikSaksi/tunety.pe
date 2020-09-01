import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CustomNavbar from 'components/universal/custom_navbar';
import Row from 'react-bootstrap/Row';
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
    }
  }
`;
export default function Profile() {
  const { userName } = useParams();
  const { data: { userData } = {}, loading } = useQuery(SIGNED_IN_USER, {
    variables: { userName },
  });

  if (loading) {
    return <Loading centered />;
  }
  if (userData && !userData.existsInDB) {
    return <p>Couldn't find user</p>;
  }
  console.log(userData)
  return (
    <>
      <CustomNavbar />
      <CustomCard>
        <Row style={{ justifyContent: 'center' }}>
          <p> {userName} </p>
        </Row>
        <Container>
          {loading ? (
            <Loading centered />
          ) : (
            userData.synchronizations.map((synchronization) => <SearchResult {...synchronization.searchResult} />)
          )}
        </Container>
      </CustomCard>
    </>
  );
}
