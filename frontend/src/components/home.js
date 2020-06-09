import React, {useState} from 'react';
import HomeSearchResult from './home_search_result.js'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { gql } from 'apollo-boost'
import { usequery } from '@apollo/react-hooks';
const query = gql`
  query getsearchresults($query: string){
    geniusSearchResults(query: $query){
      imgUrl
      text
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
    <Container md>
      <Row className="justify-content-md-center">
        <Form onChange={(e) => setText(e.target.value)}>
          <Form.Label style={{fontSize: '40px'}}>Search for an artist and/or song or enter YouTube URL  </Form.Label>
          <Form.Control placeholder='Search' />
        </Form>
      </Row>
    <Row style = {{justifyContent: 'center'}}>
      { data
          ? data.searchResults.map((result, index) => <HomeSearchResult key = {index} {...result} fadeInMillis = {(index + 1) * 100}/>)
         : text != '' 
            ?  <div> 
                 <Image src = {require('../loading.gif')}></Image>
               </div>
            :  null
      }
    </Row>
    </Container>
  );
}
