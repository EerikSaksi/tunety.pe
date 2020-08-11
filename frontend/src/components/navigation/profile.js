import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CustomNavbar from 'components/universal/custom_navbar';
import Loading from 'components/universal/loading';
import { useParams } from 'react-router-dom';

const SIGNED_IN_USER = gql`
  query signedinuser($tokenId: String) {
    signedInUser(tokenId: $tokenId) {
      userName
      existsInDB
      synchronizations {
        youtubeID
        geniusID
      }
    }
  }
`;
export default function Profile({}) {
  const { userName } = useParams();
  const { data: { signedInUser } = {} } = useQuery(SIGNED_IN_USER, {
    variables: { userName },
  });

  if (loading) {
    return <Loading centered />;
  }
  if (signedInUser && !signedInUser.existsInDB) {
    return <p>Couldn't find user</p>;
  }
  return (
    <>
      <CustomNavbar/>
    </>
  );
}
