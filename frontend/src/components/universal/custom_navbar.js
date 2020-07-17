import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {useHistory} from "react-router-dom";
import GitHubButton from 'react-github-btn'
export default function CustomNavBar({centerContent}) {
  const history = useHistory()
  return (
    <NavBar style={{height: 60}} bg='secondary' variant='dark'>
      <NavBar.Brand onClick={() => history.push('/')}>
        <Button variant='light'>
          <img src={require('icons8-home.svg')} style={{height: 30, width: 30}} />
        </Button>
      </NavBar.Brand>
    <NavBar.Collapse className = 'justify-content-center'>
      {centerContent}
    </NavBar.Collapse>
      <Nav className='ml-auto'>
        <GitHubButton href="https://github.com/EerikSaksi/type_to_lyrics" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star EerikSaksi/type_to_lyrics on GitHub">Star</GitHubButton>
      </Nav>
    </NavBar >
  )
}


