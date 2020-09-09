import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import 'components/lyrics/playing/pregame_popover.css';
export default function PregamePopover({ playing, setPlaying, setShowCat, gameStats }) {
  const [selectedTab, setSelectedTab] = useState('/leaderboards');
  const [showAlert, setShowAlert] = useState('');
  return (
    <Alert
      show={!playing}
      variant='primary'
      className='shadow-lg fade'
      style={{
        top: 80,
        bottom: 20,
        marginBottom: 0,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        zIndex: 1000,
      }}
    >
      <Nav style={{ height: '10%' }} variant='pills' activeKey={selectedTab} onSelect={(selectedTab) => setSelectedTab(selectedTab)}>
        <Nav.Item>
          <Nav.Link eventKey='/leaderboards'>Leaderboards</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='/options'>Options</Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === '/leaderboards' ? (
        gameStats ? (
          gameStats.map((gameStat) => {
            const { playerUserName, wordsPerMinute, accuracy } = gameStat;
            return (
              <Row id={gameStat.bb} style={{ height: '10%' }}>
                <Col style={{ borderColor: 'black' }}>
                  <p>{playerUserName}</p>
                </Col>
                <Col style={{ justifyContent: 'right' }}>
                  <p>{`${wordsPerMinute}wpm`} </p>
                </Col>
                <Col style={{ justifyContent: 'right' }}>
                  <p>{`${accuracy}%`}</p>
                </Col>
              </Row>
            );
          })
        ) : null
      ) : (
        <Row>
          <Col xs={1} style={{ alignSelf: 'center' }}>
            <Form.Check
              onClick={(e) => {
                setShowCat(e.target.checked);
                setShowAlert(true);
              }}
              variant='checkbox'
            />
          </Col>
          <Col>
            <p style={{ alignSelf: 'center', fontSize: 40, marginBottom: 0 }}>Add cat</p>
            <Alert dismissible show={showAlert} onClose={() => setShowAlert(false)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} variant='danger'>
              <Alert.Heading style={{ textAlign: 'center' }}>Warning! This setting only works for absolute bangers!</Alert.Heading>
              <Row style={{ justifyContent: 'center' }}>
                <Button onClick={() => setShowAlert(false)}>Don't worry I only play bangers</Button>
              </Row>
            </Alert>
          </Col>
        </Row>
      )}
      <Row style={{ justifyContent: 'center', height: '10%' }}>
        <Button style = {{height: '40%', alignSelf:"center"}} onClick={() => setPlaying(true)}>Play!</Button>
      </Row>
    </Alert>
  );
}
