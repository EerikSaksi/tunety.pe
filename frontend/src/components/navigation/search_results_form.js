import React, {useRef, useEffect} from 'react'
import Loading from 'components/universal/loading'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import SearchResult from 'components/navigation/search_result'
export default function SearchResultForm({results, input, setInput, loading, defaultValue}) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.focus()
    if (defaultValue) {
      setInput(defaultValue)
    }
  }, [])
  return (
    <Container fluid={'md'}>
      <Row className="justify-content-md-center">
        <Form onChange={(e) => setInput(e.target.value)}>
          <Form.Control defaultValue={defaultValue ? defaultValue : ""} ref={ref} placeholder='Search' />
          <Form.Check
            style ={{fontSize: 15}}
            label = 'Only show synchronized songs'
            className="justify-content-md-center"
          />

        </Form>
      </Row>
      <Row style={{justifyContent: 'center', marginTop: 5}}>
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
