import React from 'react';
import Loading from 'components/universal/loading';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import SearchResult from 'components/navigation/search_result';
export default function SearchResultForm({ results, input, setInput, loading}) {
  return (
    <Container fluid style={{ zIndex: 1000 }}>
      <Row className='justify-content-center'>
        <Form
          onChange={(e) => setInput(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Control value={input} placeholder='Search' autoFocus />
        </Form>
      </Row>
      <Row style={{ justifyContent: 'center', marginTop: 5, }}>
        {input === '' ? null : !loading && results ? (
          results.map((result, index) => <SearchResult key={index} {...result} fadeInMillis={(index + 1) * 100} />)
        ) : (
          <Loading centered={false} />
        )}
      </Row>
    </Container>
  );
}
