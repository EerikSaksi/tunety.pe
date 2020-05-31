import React, {useState} from 'react';
import HomeSearchResult from './home_search_result.js'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
const QUERY = gql`
  query getsearchresults($query: String){
    searchResults(query: $query){
      id
      imgUrl
      artistName
      songName
    }
  }
`
export default function Home(){
  const [text, setText] = useState('');
  const {data} = useQuery(QUERY, {
    variables : { query: text},
    skip: text === ''
  });
  return(
    <Container size='md'>
      <Form onChange={(e) => setText(e.target.value)}>
        <Form.Label style={{fontSize: '40px'}}>Search for an artist and/or song or enter YouTube URL  </Form.Label>
        <Form.Control placeholder='Search' />
      </Form>
    { data
       ? data.searchResults.map((result, index ) => <HomeSearchResult key = {index} {...result}/>) 
       : text != '' 
         ?  <p>Loading search results...</p>
         :  null
    }
    </Container>
  );
}
