import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import GitHubButton from 'react-github-btn';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { clientId } from 'components/universal/google_login_secrets';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import useWindowSize from '@rehooks/window-size';

const SIGNED_IN_USER = gql`
  query signedinuser($tokenId: String) {
    signedInUser(tokenId: $tokenId) {
      userName
      existsInDB
    }
  }
`;

const USER_NAME_TAKEN = gql`
  query usernametaken($userName: String) {
    userNameTaken(userName: $userName)
  }
`;

const CREATE_USER = gql`
  mutation createuser($tokenId: String, $userName: String) {
    createUser(tokenId: $tokenId, userName: $userName)
  }
`;

export default function CustomNavbar({ centerContent, customContent }) {
  const history = useHistory();

  const { innerWidth, innerHeight } = useWindowSize();

  //set by google client onSuccess
  const [tokenId, setTokenId] = useState('');

  //this will be called after the tokenId has been set and fetches the username of the user
  const [fetchUserInfo, { data: { signedInUser } = {} }] = useLazyQuery(
    SIGNED_IN_USER,
    {
      onCompleted: (data) => {
        if (!data.signedInUser.existsInDB) {
          setShowAlert(true);
        }
      },
    }
  );

  //this userName can be edited from the alert form
  const [inputUsername, setInputUsername] = useState('');

  const { data: { userNameTaken } = {} } = useQuery(USER_NAME_TAKEN, {
    variables: { userName: inputUsername },
    skip: !signedInUser || signedInUser.existsInDB,
  });

  //alert that lets users create users
  const [showAlert, setShowAlert] = useState(false);

  const [postUser, { data: { createUser } = {} }] = useMutation(CREATE_USER, {
    variables: { userName: inputUsername, tokenId: tokenId },
    onCompleted: () => {
      fetchUserInfo({ variables: { tokenId: tokenId } });
      setShowAlert(false);
    },
  });

  return (
    <>
      <Alert
        className='shadow-lg'
        style={{
          position: 'absolute',
          left: innerWidth * 0.5,
          top: innerHeight * 0.5,
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
        show={showAlert}
        dismissible={true}
        onClose={() => setShowAlert(false)}
        variant='primary'
      >
        {
          <>
            <Alert.Heading>Create a username for your account</Alert.Heading>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                postUser();
              }}
              onChange={(e) => setInputUsername(e.target.value)}
            >
              <Form.Control
                style={{ marginTop: 'em' }}
                placeholder='Enter username for your new account'
                autoFocus
              />
              <Button
                style={{
                  position: 'relative',
                  marginTop: '1em',
                  left: '50%',
                  transform: 'translate(-50%, 0px)',
                }}
                disabled={userNameTaken}
                onClick={() => postUser()}
              >
                Create account
              </Button>
            </Form>
          </>
        }
      </Alert>
      <Navbar style={{ height: 60 }} sticky='top' bg='secondary' variant='dark'>
        <Navbar.Brand onClick={() => history.push('/')}>
          <Button
            variant='outline-primary'
            style={{ justifyContent: 'left', width: 142, height: 44 }}
            size='sm'
          >
            <img
              src={require('../../media/home.png')}
              style={{ top: 0, height: '100%', width: '100%' }}
            />
          </Button>
        </Navbar.Brand>
        {customContent}
        <Navbar.Collapse
          style={{
            position: 'absolute',
            transform: 'translate(-50%, 0%)',
            left: '50%',
          }}
        >
          {centerContent}
        </Navbar.Collapse>
        <Nav className='ml-auto'>
          <div
            style={{
              marginRight: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <GitHubButton
              href='https://github.com/EerikSaksi/type_to_lyrics'
              data-icon='octicon-star'
              data-size='large'
              data-show-count='true'
              aria-label='Star EerikSaksi/type_to_lyrics on GitHub'
            >
              Star
            </GitHubButton>
          </div>
          {signedInUser && signedInUser.existsInDB ? (
            <DropdownButton
              title={`Signed in as ${signedInUser.userName}`}
              style={{ alignSelf: 'center' }}
            >
              <GoogleLogout clientId={clientId} />
            </DropdownButton>
          ) : showAlert ? (
            <p style={{ fontSize: 20, alignItems: 'center' }}>
              {' '}
              Logging in...{' '}
            </p>
          ) : (
            <GoogleLogin
              clientId={clientId}
              onSuccess={(response) => {
                setTokenId(response.tokenId);
                fetchUserInfo({ variables: { tokenId: response.tokenId } });
              }}
              isSignedIn={true}
              style={{ height: 40 }}
            />
          )}
        </Nav>
      </Navbar>
    </>
  );
}
