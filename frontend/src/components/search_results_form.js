import React from 'react'
import Loading from './loading'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import HomeSearchResult from './home_search_result'
export default function SearchResultForm({results, input, setInput, formText, formatHistory}){
  return (
    <Container fluid = {'md'}>
      <Row className="justify-content-md-center">
        <Form onChange={(e) => setInput(e.target.value)}>
          <Form.Label style={{fontSize: '40px'}}> <p style = {{textAlign: 'center'}}>{formText}</p> </Form.Label>
          <Form.Control placeholder='Search' />
        </Form>
      </Row>
      <Row style={{justifyContent: 'center'}}>
        { results && results !== []
          ? results.map((result, index) => <HomeSearchResult key = {index} {...result} fadeInMillis={(index + 1) * 100} formatHistory = {formatHistory}/>)
          : input != ''
            ? <Loading />
            : null
        }
      </Row>
    </Container>
  )
} 
