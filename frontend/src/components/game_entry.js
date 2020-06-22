import React, {useState} from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Container'
import Gam
function GameEntry(captions, url){
  var input_style = {
    'background': `linear-gradient(to right, green ${accuracy}%, red ${accuracy}%)`,
    'fontSize': '50px', 
    'textAlign': 'center',
    'color': 'white'
  }
  const [input, setInput] = useState('')
  return(
    <Container>
      <Row className="justify-content-md-center" style = {{bottom: 0}}>
        <Form onChange = {(e) => setInput(e.target.value)}>
          <Form.Control/>
        </Form>
      </Row>
    </Container>
  );
}
export default TextInput;
