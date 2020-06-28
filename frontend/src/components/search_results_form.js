import React, {useRef, useEffect} from 'react'
import Loading from './loading'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import SearchResult from './home_search_result'
export default function SearchResultForm({results, input, setInput, formText, loading, defaultValue}) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.focus()
    if (defaultValue){
      setInput(defaultValue)
    }
  }, [])
  return (
    <Container fluid={'md'}>
      <Row className="justify-content-md-center">
        <Form onChange={(e) => setInput(e.target.value)}>
          <Form.Label style={{fontSize: '40px'}}> <p style={{textAlign: 'center'}}>{formText}</p> </Form.Label>
          <Form.Control defaultValue={defaultValue ? defaultValue : ""} ref={ref} placeholder='Search' />
        </Form>
      </Row>
      <Row style={{justifyContent: 'center', marginTop: 5 }}>
        {input === ''
          ? null
          : !loading && results && results !== []
            ? results.map((result, index) => <SearchResult key={index} {...result} fadeInMillis={(index + 1) * 100} />)
            : <Loading />
        }
      </Row>
    </Container>
  )
} 
