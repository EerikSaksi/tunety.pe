import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useHistory} from "react-router-dom";
import GitHubButton from 'react-github-btn'
export default function CustomNavbar({centerContent, customContent}) {
  const history = useHistory()
  return (
    <Navbar style={{height: 60}} sticky='top' bg='secondary' variant='dark'>
      <Navbar.Brand onClick={() => history.push('/')}>
        <Button variant='light'>
          <img src={require('icons8-home.svg')} style={{height: 30, width: 30}} />
        </Button>
      </Navbar.Brand>
      {customContent}
      <Navbar.Collapse style={{position: 'absolute', transform: 'translate(-50%, 0%)', left: '50%'}}>
        {centerContent}
      </Navbar.Collapse>
      <Nav className='ml-auto'>
        <GitHubButton href="https://github.com/EerikSaksi/type_to_lyrics" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star EerikSaksi/type_to_lyrics on GitHub">Star</GitHubButton>
      </Nav>
    </Navbar >

  )
}


